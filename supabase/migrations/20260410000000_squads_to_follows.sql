-- ============================================================
-- NIVEL — Migrate from squads to follows model
-- ============================================================

-- 1. DROP DEPENDENT OBJECTS FIRST (policies, triggers, functions)

-- Drop RLS policies on duels
drop policy if exists "duels_select_squad" on public.duels;
drop policy if exists "duels_insert" on public.duels;
drop policy if exists "duels_update_participant" on public.duels;

-- Drop RLS policies on squad_members
drop policy if exists "squad_members_select" on public.squad_members;
drop policy if exists "squad_members_insert" on public.squad_members;
drop policy if exists "squad_members_delete" on public.squad_members;

-- Drop RLS policies on squads
drop policy if exists "squads_select_member" on public.squads;
drop policy if exists "squads_select_created" on public.squads;
drop policy if exists "squads_insert_auth" on public.squads;
drop policy if exists "squads_update_owner" on public.squads;

-- Drop old squad-based policies on other tables
drop policy if exists "profiles_select_squad" on public.profiles;
drop policy if exists "habit_logs_select_squad" on public.habit_logs;
drop policy if exists "activity_select" on public.activity;

-- Drop squad helper function
drop function if exists public.get_my_squad_ids();

-- 2. DROP TABLES

drop table if exists public.duels cascade;
drop table if exists public.squad_members cascade;
drop table if exists public.squads cascade;
drop table if exists public.kudos cascade;

-- 3. ALTER EXISTING TABLES

-- Remove squad_id from activity
drop index if exists activity_squad_created_idx;
alter table public.activity drop column if exists squad_id;

-- Update activity type CHECK to remove squad-related types
alter table public.activity drop constraint if exists activity_type_check;
alter table public.activity add constraint activity_type_check
  check (type in (
    'habit_completed', 'level_up', 'streak_milestone',
    'achievement_unlocked', 'started_following'
  ));

-- Remove notify_squad from profiles, add is_private
alter table public.profiles drop column if exists notify_squad;
alter table public.profiles add column if not exists is_private boolean not null default false;

-- 4. CREATE NEW TABLES

create table public.follows (
  follower_id uuid not null references public.profiles on delete cascade,
  following_id uuid not null references public.profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id != following_id)
);
create index follows_following_idx on public.follows (following_id);

alter table public.follows enable row level security;

create table public.reactions (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activity on delete cascade,
  user_id uuid not null references public.profiles on delete cascade,
  emoji text not null default 'fire',
  created_at timestamptz not null default now(),
  unique (activity_id, user_id)
);

alter table public.reactions enable row level security;

-- 5. HELPER FUNCTION

create or replace function public.get_following_ids()
returns setof uuid
language sql security definer stable
as $$ select following_id from public.follows where follower_id = auth.uid() $$;

-- 6. RLS POLICIES

-- Follows: see your own follows + people who follow you
create policy "follows_select" on public.follows
  for select using (follower_id = auth.uid() or following_id = auth.uid());

create policy "follows_insert" on public.follows
  for insert with check (follower_id = auth.uid());

create policy "follows_delete" on public.follows
  for delete using (follower_id = auth.uid());

-- Profiles: any authenticated user can view profiles (needed for search)
create policy "profiles_select_any" on public.profiles
  for select using (auth.uid() is not null);

-- Drop the old own-only select since the new one is broader
drop policy if exists "profiles_select_own" on public.profiles;

-- Habit logs: visible to followers
create policy "habit_logs_select_following" on public.habit_logs
  for select using (
    user_id in (select public.get_following_ids())
  );

-- Activity: visible if own or from someone you follow
create policy "activity_select" on public.activity
  for select using (
    user_id = auth.uid()
    or user_id in (select public.get_following_ids())
  );

-- Reactions: see reactions on visible activities, manage your own
create policy "reactions_select" on public.reactions
  for select using (
    activity_id in (
      select id from public.activity
      where user_id = auth.uid()
         or user_id in (select public.get_following_ids())
    )
  );

create policy "reactions_insert" on public.reactions
  for insert with check (user_id = auth.uid());

create policy "reactions_delete" on public.reactions
  for delete using (user_id = auth.uid());

-- 7. UPDATE update_user_xp() — remove squad_id logic

create or replace function public.update_user_xp()
returns trigger as $$
declare
  current_profile record;
  new_xp int;
  new_level int;
  xp_needed int;
  streak_mult numeric;
  user_streak int;
begin
  if new.completed = false then return new; end if;

  select * into current_profile from public.profiles where id = new.user_id;
  user_streak := public.calculate_streak(new.user_id);

  if user_streak >= 30 then streak_mult := 2.0;
  elsif user_streak >= 7 then streak_mult := 1.5;
  else streak_mult := 1.0;
  end if;

  new.pts_earned := floor(new.pts_earned * streak_mult)::int;
  new_xp := current_profile.xp + new.pts_earned;
  new_level := current_profile.level;

  loop
    xp_needed := public.xp_for_level(new_level);
    exit when new_xp < xp_needed;
    new_xp := new_xp - xp_needed;
    new_level := new_level + 1;
  end loop;

  update public.profiles set
    xp = new_xp,
    level = new_level,
    streak = user_streak,
    best_streak = greatest(best_streak, user_streak)
  where id = new.user_id;

  insert into public.activity (user_id, type, payload)
  values (
    new.user_id, 'habit_completed',
    jsonb_build_object(
      'habit_name', (select name from public.habits where id = new.habit_id),
      'pts', new.pts_earned
    )
  );

  if new_level > current_profile.level then
    insert into public.activity (user_id, type, payload)
    values (new.user_id, 'level_up',
      jsonb_build_object('new_level', new_level));
  end if;

  return new;
end;
$$ language plpgsql security definer;

-- 8. REALTIME for new tables
alter publication supabase_realtime add table public.follows;
alter publication supabase_realtime add table public.reactions;
