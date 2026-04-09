-- Allow users to see squads they created (needed so insert().select() works)
create policy "squads_select_created" on public.squads
  for select using (auth.uid() = created_by);

-- Fix squads_select_member to use security definer function
drop policy if exists "squads_select_member" on public.squads;
create policy "squads_select_member" on public.squads
  for select using (
    id in (select public.get_my_squad_ids())
  );

-- Fix habit_logs_select_squad to use security definer function
drop policy if exists "habit_logs_select_squad" on public.habit_logs;
create policy "habit_logs_select_squad" on public.habit_logs
  for select using (
    user_id in (
      select sm.user_id from public.squad_members sm
      where sm.squad_id in (select public.get_my_squad_ids())
    )
  );

-- Fix activity_select to use security definer function
drop policy if exists "activity_select" on public.activity;
create policy "activity_select" on public.activity
  for select using (
    (squad_id is null and user_id = auth.uid())
    or squad_id in (select public.get_my_squad_ids())
  );

-- Fix duels_select_squad to use security definer function
drop policy if exists "duels_select_squad" on public.duels;
create policy "duels_select_squad" on public.duels
  for select using (
    squad_id in (select public.get_my_squad_ids())
  );
