'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/shared'
import { Heart, Flame, Check, Plus, ChevronRight } from 'lucide-react'

const INITIAL_HABITS = [
  { id: 1, name: 'Gym 1h', pts: 50, done: false },
  { id: 2, name: 'Leer 30min', pts: 30, done: true },
  { id: 3, name: 'Sin alcohol', pts: 30, done: true },
  { id: 4, name: 'Meditar 10min', pts: 15, done: false },
  { id: 5, name: 'Madrugar', pts: 50, done: true },
  { id: 6, name: 'Mascarilla pelo', pts: 15, done: false },
]

const FEED = [
  { name: 'Carlos M.', action: 'Gym 1h', pts: 50, time: 'Hace 12min', kudos: 8, streak: 21 },
  { name: 'María L.', action: 'Meditación 15min', pts: 30, time: 'Hace 45min', kudos: 5 },
  { name: 'David R.', action: 'Leer 30min', pts: 30, time: 'Hace 2h', kudos: 3 },
]

export default function Dashboard() {
  const [habits, setHabits] = useState(INITIAL_HABITS)
  const [balance, setBalance] = useState(850)
  const [earnedToast, setEarnedToast] = useState<string | null>(null)
  const [kudosGiven, setKudosGiven] = useState<number[]>([])

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const newDone = !h.done
          setBalance((b) => (newDone ? b + h.pts : b - h.pts))
          if (newDone) {
            setEarnedToast(`+${h.pts}`)
            setTimeout(() => setEarnedToast(null), 1200)
          }
          return { ...h, done: newDone }
        }
        return h
      })
    )
  }

  const giveKudos = (idx: number) => {
    if (!kudosGiven.includes(idx)) setKudosGiven((k) => [...k, idx])
  }

  const todayEarned = habits.filter((h) => h.done).reduce((sum, h) => sum + h.pts, 0)
  const completedCount = habits.filter((h) => h.done).length

  return (
    <div className="pt-14 px-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-muted mb-0.5">Buenos días</p>
          <h1 className="text-xl font-bold">Javier</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-bold text-accent">14d</span>
          </div>
          <Logo size="sm" />
        </div>
      </div>

      {/* Balance */}
      <motion.div className="bg-white rounded-2xl p-5 border border-border shadow-sm mb-6 relative overflow-hidden" layout>
        <p className="text-[10px] text-muted font-semibold uppercase tracking-widest">Tu saldo</p>
        <div className="flex items-baseline gap-2 mt-1.5 relative">
          <motion.span
            className="text-5xl font-extrabold"
            key={balance}
            initial={{ scale: 1.08, color: '#FC5200' }}
            animate={{ scale: 1, color: '#111827' }}
            transition={{ duration: 0.4 }}
          >
            {balance.toLocaleString()}
          </motion.span>
          <span className="text-base text-muted font-medium">pts</span>
          <AnimatePresence>
            {earnedToast && (
              <motion.span
                className="absolute -top-6 right-0 text-lg font-bold text-accent"
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
          <span className="text-xs text-accent font-medium">+{todayEarned} hoy</span>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-muted">{completedCount}/{habits.length} completados</span>
        </div>
        <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            animate={{ width: `${(completedCount / habits.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Today's habits */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-widest">Hoy</h2>
          <span className="text-[10px] text-muted">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
        </div>
        <div className="space-y-2">
          {habits.map((h) => (
            <motion.button
              key={h.id}
              onClick={() => toggleHabit(h.id)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition border shadow-sm ${
                h.done ? 'bg-success-bg border-success/20' : 'bg-white border-border hover:border-accent/20'
              }`}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={`w-5 h-5 rounded-md flex items-center justify-center ${
                    h.done ? 'bg-success text-white' : 'border border-gray-300'
                  }`}
                  animate={h.done ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {h.done && <Check className="w-3 h-3" />}
                </motion.div>
                <span className={`text-sm font-medium ${h.done ? 'text-muted line-through' : ''}`}>
                  {h.name}
                </span>
              </div>
              <span className={`text-xs font-bold ${h.done ? 'text-success' : 'text-muted'}`}>+{h.pts}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Squad feed */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-widest">Tu squad</h2>
          <a href="/app/squad" className="text-[10px] text-accent font-semibold flex items-center gap-0.5">
            Ver todo <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        <div className="space-y-2">
          {FEED.map((item, i) => (
            <div key={i} className="bg-white border border-border rounded-xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  {item.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{item.name}</span>
                    {item.streak && (
                      <span className="text-[10px] text-accent font-bold flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" /> {item.streak}d
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-muted">{item.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-success" />
                  <span className="text-sm font-medium">{item.action}</span>
                  <span className="text-xs text-accent font-bold">+{item.pts}</span>
                </div>
                <motion.button
                  onClick={() => giveKudos(i)}
                  className={`flex items-center gap-1 transition ${kudosGiven.includes(i) ? 'text-accent' : 'text-gray-400 hover:text-accent'}`}
                  whileTap={{ scale: 1.3 }}
                >
                  <Heart className={`w-4 h-4 ${kudosGiven.includes(i) ? 'fill-accent' : ''}`} />
                  <span className="text-[10px] font-medium">{item.kudos + (kudosGiven.includes(i) ? 1 : 0)}</span>
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
