'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Heart, UserPlus, UserMinus, Search, Loader2, Copy, Check, Share2, Flame } from 'lucide-react'
import { ComparisonBars } from '@/components/charts'
import { createClient } from '@/lib/supabase/client'

interface RankedUser {
  user_id: string
  name: string
  initials: string
  avatar_url: string | null
  pts: number
  isYou?: boolean
}

interface FeedItem {
  id: string
  user_id: string
  type: string
  payload: { habit_name?: string; pts?: number; new_level?: number }
  created_at: string
  user_name: string
  user_avatar: string | null
  reaction_count: number
  has_reacted: boolean
}

interface SearchResult {
  id: string
  display_name: string | null
  username: string | null
  avatar_url: string | null
  level: number
  is_following: boolean
}

export default function AmigosPage() {
  const supabase = createClient()
  const [tab, setTab] = useState<'ranking' | 'feed'>('ranking')
  const [ranking, setRanking] = useState<RankedUser[]>([])
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const [followingCount, setFollowingCount] = useState(0)
  const [followersCount, setFollowersCount] = useState(0)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const [inviteCodes, setInviteCodes] = useState<{ code: string; used: boolean }[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [followLoading, setFollowLoading] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setCurrentUserId(user.id)

    const [
      { data: followingData },
      { count: followingCnt },
      { count: followersCnt },
      { data: invData },
    ] = await Promise.all([
      supabase.from('follows').select('following_id').eq('follower_id', user.id),
      supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', user.id),
      supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', user.id),
      supabase.from('invitations').select('code, used_by').eq('owner_id', user.id),
    ])

    setFollowingCount(followingCnt || 0)
    setFollowersCount(followersCnt || 0)
    setInviteCodes(invData?.map(i => ({ code: i.code, used: i.used_by !== null })) || [])

    const followingIds = followingData?.map(f => f.following_id) || []

    // Build ranking: you + people you follow
    const allIds = [user.id, ...followingIds]
    const weekStart = getWeekStart()

    const rankingList: RankedUser[] = await Promise.all(
      allIds.map(async (uid) => {
        const [{ data: profile }, { data: logs }] = await Promise.all([
          supabase.from('profiles').select('display_name, username, avatar_url').eq('id', uid).single(),
          supabase.from('habit_logs').select('pts_earned').eq('user_id', uid).gte('log_date', weekStart).eq('completed', true),
        ])
        const pts = logs?.reduce((s, l) => s + l.pts_earned, 0) || 0
        const name = profile?.display_name || profile?.username || 'Anónimo'
        return {
          user_id: uid,
          name,
          initials: name.slice(0, 2).toUpperCase(),
          avatar_url: profile?.avatar_url || null,
          pts,
          isYou: uid === user.id,
        }
      })
    )

    rankingList.sort((a, b) => b.pts - a.pts)
    setRanking(rankingList)

    // Activity feed from people you follow
    if (followingIds.length > 0) {
      const { data: activityData } = await supabase
        .from('activity')
        .select('id, user_id, type, payload, created_at, profiles!activity_user_id_fkey(display_name, avatar_url)')
        .in('user_id', followingIds)
        .order('created_at', { ascending: false })
        .limit(20)

      if (activityData) {
        const feedItems: FeedItem[] = await Promise.all(
          activityData.map(async (a) => {
            const profile = a.profiles as unknown as { display_name: string | null; avatar_url: string | null }
            const { count } = await supabase
              .from('reactions')
              .select('*', { count: 'exact', head: true })
              .eq('activity_id', a.id)
            const { data: myReaction } = await supabase
              .from('reactions')
              .select('id')
              .eq('activity_id', a.id)
              .eq('user_id', user.id)
              .limit(1)

            return {
              id: a.id,
              user_id: a.user_id,
              type: a.type,
              payload: a.payload as FeedItem['payload'],
              created_at: a.created_at,
              user_name: profile?.display_name || 'Alguien',
              user_avatar: profile?.avatar_url || null,
              reaction_count: count || 0,
              has_reacted: (myReaction?.length || 0) > 0,
            }
          })
        )
        setFeed(feedItems)
      }
    }

    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchData() }, [fetchData])

  const searchUsers = useCallback(async (query: string) => {
    if (query.length < 2) { setSearchResults([]); return }
    setSearching(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSearching(false); return }

    const { data: results } = await supabase
      .from('profiles')
      .select('id, display_name, username, avatar_url, level')
      .or(`display_name.ilike.%${query}%,username.ilike.%${query}%`)
      .neq('id', user.id)
      .limit(10)

    if (results) {
      const { data: myFollows } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)

      const followingSet = new Set(myFollows?.map(f => f.following_id) || [])

      setSearchResults(results.map(r => ({
        ...r,
        is_following: followingSet.has(r.id),
      })))
    }

    setSearching(false)
  }, [supabase])

  useEffect(() => {
    const timer = setTimeout(() => searchUsers(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery, searchUsers])

  const toggleFollow = async (userId: string, currentlyFollowing: boolean) => {
    if (!currentUserId) return
    setFollowLoading(userId)

    if (currentlyFollowing) {
      await supabase.from('follows').delete().eq('follower_id', currentUserId).eq('following_id', userId)
      setFollowingCount(c => c - 1)
    } else {
      await supabase.from('follows').insert({ follower_id: currentUserId, following_id: userId })
      setFollowingCount(c => c + 1)
    }

    setSearchResults(prev => prev.map(r => r.id === userId ? { ...r, is_following: !currentlyFollowing } : r))
    setFollowLoading(null)
    fetchData()
  }

  const toggleReaction = async (activityId: string) => {
    if (!currentUserId) return
    const item = feed.find(f => f.id === activityId)
    if (!item) return

    if (item.has_reacted) {
      await supabase.from('reactions').delete().eq('activity_id', activityId).eq('user_id', currentUserId)
      setFeed(prev => prev.map(f => f.id === activityId ? { ...f, has_reacted: false, reaction_count: f.reaction_count - 1 } : f))
    } else {
      await supabase.from('reactions').insert({ activity_id: activityId, user_id: currentUserId })
      setFeed(prev => prev.map(f => f.id === activityId ? { ...f, has_reacted: true, reaction_count: f.reaction_count + 1 } : f))
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  if (loading) {
    return (
      <div className="pt-14 px-5 flex justify-center">
        <Loader2 className="w-6 h-6 text-accent animate-spin mt-20" />
      </div>
    )
  }

  const availableCodes = inviteCodes.filter(c => !c.used)

  return (
    <div className="pt-14 px-5 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold">Amigos</h1>
          <p className="text-xs text-muted mt-0.5">
            {followingCount} siguiendo · {followersCount} seguidores
          </p>
        </div>
        <motion.button
          onClick={() => setShowSearch(!showSearch)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${showSearch ? 'bg-accent text-white' : 'bg-white border border-border text-muted'}`}
          whileTap={{ scale: 0.9 }}
        >
          <Search className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-5"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o @username..."
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-accent/40 transition"
              autoFocus
            />
            {searching && <Loader2 className="w-4 h-4 text-accent animate-spin mx-auto mt-3" />}
            {searchResults.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {searchResults.map(r => (
                  <div key={r.id} className="flex items-center gap-3 bg-white border border-border rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                      {r.avatar_url ? <img src={r.avatar_url} alt="" className="w-full h-full object-cover" /> : (r.display_name || r.username || '?')[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{r.display_name || r.username}</p>
                      <p className="text-[10px] text-muted">@{r.username} · LVL {r.level}</p>
                    </div>
                    <motion.button
                      onClick={() => toggleFollow(r.id, r.is_following)}
                      disabled={followLoading === r.id}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        r.is_following
                          ? 'bg-gray-100 text-muted hover:bg-red-50 hover:text-red-500'
                          : 'bg-accent text-white'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {followLoading === r.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : r.is_following ? (
                        <><UserMinus className="w-3 h-3" /> Siguiendo</>
                      ) : (
                        <><UserPlus className="w-3 h-3" /> Seguir</>
                      )}
                    </motion.button>
                  </div>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && !searching && searchResults.length === 0 && (
              <p className="text-xs text-muted text-center mt-3">Ningún resultado. Invita a tus amigos a NIVEL.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-border shadow-sm mb-5">
        {[
          { id: 'ranking' as const, label: 'Ranking' },
          { id: 'feed' as const, label: 'Actividad' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
              tab === t.id ? 'bg-accent text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'ranking' && (
          <motion.div key="ranking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {ranking.length <= 1 ? (
              <div className="text-center py-12">
                <UserPlus className="w-10 h-10 text-muted mx-auto mb-3" />
                <p className="text-sm font-semibold mb-1">Sigue a alguien para ver el ranking</p>
                <p className="text-xs text-muted">Busca amigos arriba o comparte tu invitación</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {ranking.map((m, i) => {
                    const youMember = ranking.find(x => x.isYou)
                    const above = i > 0 ? ranking[i - 1] : null
                    const diff = youMember && m.isYou && above ? above.pts - youMember.pts : 0

                    return (
                      <div key={m.user_id}>
                        <motion.div
                          className={`flex items-center gap-3 rounded-xl px-4 py-3.5 border shadow-sm ${
                            m.isYou ? 'bg-accent/[0.04] border-accent/15' : 'bg-white border-border'
                          }`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <span className="text-xs font-bold text-muted w-4 text-center tabular-nums">{i + 1}</span>
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                            {m.avatar_url ? <img src={m.avatar_url} alt="" className="w-full h-full object-cover" /> : m.initials}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${m.isYou ? 'text-accent' : ''}`}>
                              {m.isYou ? 'Tú' : m.name}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-muted tabular-nums">{m.pts.toLocaleString()}</span>
                        </motion.div>

                        {m.isYou && diff > 0 && above && (
                          <motion.div
                            className="flex items-center gap-2 bg-accent/[0.06] rounded-lg px-4 py-2 mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ delay: 0.5 }}
                          >
                            <Flame className="w-3 h-3 text-accent shrink-0" />
                            <p className="text-[11px] text-accent font-medium">
                              A {diff} pts de {above.name}. Una sesión más y le adelantas.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {ranking.length > 1 && (
                  <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
                    <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-3">Esta semana</p>
                    <ComparisonBars members={ranking.map(m => ({ name: m.isYou ? 'Tú' : m.name, pts: m.pts, isYou: m.isYou }))} />
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {tab === 'feed' && (
          <motion.div key="feed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {feed.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-10 h-10 text-muted mx-auto mb-3" />
                <p className="text-sm font-semibold mb-1">Sin actividad aún</p>
                <p className="text-xs text-muted">Cuando las personas que sigues completen hábitos, aparecerá aquí</p>
              </div>
            ) : (
              <div className="space-y-2">
                {feed.map((item, i) => {
                  const actionText = item.type === 'habit_completed'
                    ? item.payload.habit_name || 'un hábito'
                    : item.type === 'level_up'
                      ? `subió al nivel ${item.payload.new_level}`
                      : item.type
                  const pts = item.payload.pts || 0

                  return (
                    <motion.div
                      key={item.id}
                      className="bg-white border border-border rounded-xl px-4 py-3 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                          {item.user_avatar ? (
                            <img src={item.user_avatar} alt="" className="w-full h-full object-cover" />
                          ) : item.user_name[0]}
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-semibold">{item.user_name}</span>
                        </div>
                        <span className="text-[10px] text-muted">{getTimeAgo(item.created_at)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-accent" />
                          <span className="text-sm font-medium">{actionText}</span>
                          {pts > 0 && <span className="text-xs text-accent font-bold">+{pts}</span>}
                        </div>
                        <motion.button
                          onClick={() => toggleReaction(item.id)}
                          className={`flex items-center gap-1 transition ${item.has_reacted ? 'text-accent' : 'text-gray-400 hover:text-accent'}`}
                          whileTap={{ scale: 1.3 }}
                        >
                          <Heart className={`w-4 h-4 ${item.has_reacted ? 'fill-accent' : ''}`} />
                          {item.reaction_count > 0 && <span className="text-[10px] font-medium">{item.reaction_count}</span>}
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite section */}
      {availableCodes.length > 0 && (
        <div className="mt-6 bg-white border border-accent/15 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-accent" />
            <p className="text-xs font-bold">Invita amigos a NIVEL</p>
          </div>
          <div className="space-y-1.5">
            {availableCodes.slice(0, 2).map(inv => (
              <div key={inv.code} className="flex gap-2">
                <div className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-muted font-mono truncate">
                  {inv.code}
                </div>
                <motion.button
                  onClick={() => copyCode(inv.code)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                    copied === inv.code ? 'bg-success/10 text-success' : 'bg-accent text-white'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied === inv.code ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function getWeekStart(): string {
  const d = new Date()
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  return monday.toISOString().split('T')[0]
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `Hace ${mins}min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours}h`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Ayer'
  return `Hace ${days} días`
}
