'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coin, Logo } from '@/components/shared'

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 200, damping: 22 }

const INITIAL_HABITS = [
  { id: 1, name: 'Gym 1h', emoji: '🏋️', coins: 80, done: false },
  { id: 2, name: 'Leer 30min', emoji: '📖', coins: 40, done: true },
  { id: 3, name: 'Sin alcohol', emoji: '🚫', coins: 25, done: true },
  { id: 4, name: 'Meditar 10min', emoji: '🧘', coins: 20, done: false },
  { id: 5, name: 'Madrugar', emoji: '⏰', coins: 30, done: true },
]

const REWARDS = [
  { name: 'Cerveza', emoji: '🍺', cost: 100 },
  { name: 'Cheat meal', emoji: '🍕', cost: 150 },
  { name: 'Netflix binge', emoji: '📺', cost: 80 },
  { name: 'Dormir la mona', emoji: '😴', cost: 40 },
]

const FEED = [
  { text: 'Carlos completó 5/5 gym esta semana', time: 'Hace 2h', emoji: '🏆' },
  { text: 'David no ha ido al gym hoy', time: 'Hace 4h', emoji: '👀' },
  { text: 'María te retó: "Más km corriendo"', time: 'Ayer', emoji: '⚔️' },
  { text: 'Tu squad "Los Disciplinados" es top 8%', time: 'Ayer', emoji: '🥇' },
]

export default function Dashboard() {
  const [habits, setHabits] = useState(INITIAL_HABITS)
  const [balance, setBalance] = useState(850)
  const [earnedToast, setEarnedToast] = useState<string | null>(null)
  const [spentItems, setSpentItems] = useState<string[]>([])

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const newDone = !h.done
          setBalance((b) => (newDone ? b + h.coins : b - h.coins))
          if (newDone) {
            setEarnedToast(`+${h.coins}`)
            setTimeout(() => setEarnedToast(null), 1200)
          }
          return { ...h, done: newDone }
        }
        return h
      })
    )
  }

  const spendReward = (reward: (typeof REWARDS)[number]) => {
    if (balance < reward.cost) return
    setBalance((b) => b - reward.cost)
    setSpentItems((s) => [...s, reward.emoji])
  }

  const todayEarned = habits.filter((h) => h.done).reduce((sum, h) => sum + h.coins, 0)
  const completedCount = habits.filter((h) => h.done).length

  return (
    <div className="pt-14 px-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-neutral-500 mb-0.5">Buenos días</p>
          <h1 className="text-xl font-bold text-white">Javier 👋</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-bold text-orange-400">14 días</span>
          </div>
          <Logo size="sm" />
        </div>
      </div>

      {/* Balance card */}
      <motion.div
        className="bg-gradient-to-br from-amber-500/15 via-yellow-600/10 to-transparent rounded-2xl p-5 border border-amber-500/15 mb-6 relative overflow-hidden"
        layout
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <p className="text-[10px] text-amber-300/60 font-semibold uppercase tracking-widest">Tu saldo</p>
        <div className="flex items-baseline gap-2.5 mt-1.5 relative">
          <motion.span
            className="text-5xl font-extrabold text-white"
            key={balance}
            initial={{ scale: 1.08, color: '#f0d078' }}
            animate={{ scale: 1, color: '#fafafa' }}
            transition={{ duration: 0.4 }}
          >
            {balance.toLocaleString()}
          </motion.span>
          <Coin size={24} />
          <AnimatePresence>
            {earnedToast && (
              <motion.span
                className="absolute -top-6 right-0 text-lg font-bold text-emerald-400"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {earnedToast}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-emerald-400 font-medium">+{todayEarned} hoy</span>
          <span className="text-neutral-700">·</span>
          <span className="text-xs text-neutral-500">
            {completedCount}/{habits.length} completados
          </span>
        </div>
        {/* Progress ring */}
        <div className="mt-3">
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-amber-500 rounded-full"
              animate={{ width: `${(completedCount / habits.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Today's habits */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Hoy</h2>
          <span className="text-[10px] text-neutral-600">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
        </div>
        <div className="space-y-2">
          {habits.map((h) => (
            <motion.button
              key={h.id}
              onClick={() => toggleHabit(h.id)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition border ${
                h.done
                  ? 'bg-emerald-500/[0.06] border-emerald-500/15'
                  : 'bg-card border-border hover:border-white/10'
              }`}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    h.done ? 'bg-emerald-500 text-white' : 'border-2 border-neutral-600'
                  }`}
                  animate={h.done ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {h.done && '✓'}
                </motion.div>
                <span className="text-base">{h.emoji}</span>
                <span className={`text-sm font-medium ${h.done ? 'text-neutral-500 line-through' : 'text-white'}`}>
                  {h.name}
                </span>
              </div>
              <span
                className={`text-xs font-bold flex items-center gap-1.5 ${
                  h.done ? 'text-emerald-400' : 'text-neutral-500'
                }`}
              >
                +{h.coins} <Coin size={11} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Spend coins */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Gastar monedas</h2>
          {spentItems.length > 0 && (
            <div className="flex gap-0.5 text-base">
              {spentItems.map((e, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={SPRING_SNAPPY}>
                  {e}
                </motion.span>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {REWARDS.map((r, i) => {
            const canAfford = balance >= r.cost
            return (
              <motion.button
                key={i}
                onClick={() => spendReward(r)}
                disabled={!canAfford}
                className={`bg-card border rounded-xl p-3.5 text-left transition ${
                  canAfford ? 'border-border hover:border-vice/30 active:bg-vice/5' : 'border-border opacity-30'
                }`}
                whileTap={canAfford ? { scale: 0.96 } : undefined}
              >
                <span className="text-2xl block mb-1">{r.emoji}</span>
                <p className="text-xs font-semibold text-white">{r.name}</p>
                <p className="text-[10px] font-bold text-vice mt-0.5 flex items-center gap-1">
                  -{r.cost} <Coin size={9} />
                </p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Squad feed */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Tu squad</h2>
        <div className="space-y-2">
          {FEED.map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl px-4 py-3 flex items-start gap-3">
              <span className="text-base mt-0.5 shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral-300 leading-relaxed">{item.text}</p>
                <p className="text-[10px] text-neutral-600 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
