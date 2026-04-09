import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  await supabase.from('habits').delete().eq('user_id', user.id)
  await supabase.from('follows').delete().eq('follower_id', user.id)
  await supabase
    .from('profiles')
    .update({ onboarding_done: false, display_name: null, username: null, avatar_url: null })
    .eq('id', user.id)

  return NextResponse.json({ ok: true })
}
