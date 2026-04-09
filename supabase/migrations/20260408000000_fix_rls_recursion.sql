-- Fix infinite RLS recursion between profiles and squad_members.
-- The squad_members_select policy referenced squad_members itself,
-- and profiles_select_squad also referenced squad_members, causing
-- Postgres to detect infinite recursion.

-- Security-definer function bypasses RLS so policies can use it safely.
create or replace function public.get_my_squad_ids()
returns setof uuid as $$
  select squad_id from public.squad_members where user_id = auth.uid()
$$ language sql security definer stable;

-- Drop the broken policies
drop policy if exists "squad_members_select" on public.squad_members;
drop policy if exists "profiles_select_squad" on public.profiles;

-- Recreate without recursion
create policy "squad_members_select" on public.squad_members
  for select using (
    squad_id in (select public.get_my_squad_ids())
  );

create policy "profiles_select_squad" on public.profiles
  for select using (
    id in (
      select user_id from public.squad_members
      where squad_id in (select public.get_my_squad_ids())
    )
  );
