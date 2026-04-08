'use client'

import { motion } from 'framer-motion'
import { Coin } from '@/components/shared'

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 18 }

const THIS_WEEK = {
  week: 14,
  level: 23,
  balance: 420,
  habits: [
    { name: 'Gym', done: 5, total: 5, color: 'bg-emerald-400' },
    { name: 'Lectura', done: 4, total: 7, color: 'bg-blue-400' },
    { name: 'Sin alcohol', done: 6, total: 7, color: 'bg-amber-400' },
    { name: 'Meditación', done: 3, total: 5, color: 'bg-violet-400' },
    { name: 'Madrugar', done: 4, total: 5, color: 'bg-rose-400' },
  ],
  vicesEarned: ['🍺', '🍺', '🍕', '📺'],
  squadPosition: 3,
  bestStreak: 14,
}

const PAST_WEEKS = [
  { week: 13, level: 22, balance: 380, score: 78, highlight: '6/6 gym 💪' },
  { week: 12, level: 21, balance: 290, score: 65, highlight: 'Primer duelo ganado ⚔️' },
  { week: 11, level: 20, balance: 450, score: 88, highlight: 'Mejor semana del mes 🏆' },
  { week: 10, level: 19, balance: 320, score: 72, highlight: 'Racha x3 conseguida 🔥' },
  { week: 9, level: 18, balance: 180, score: 45, highlight: 'Semana floja 😅' },
]

export default function RecapPage() {
  return (
    <div className="pt-14 px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-white">Recap</h1>
        <span className="text-xs text-neutral-500">Semana actual</span>
      </div>

      {/* Current week recap card */}
      <motion.div
        className="bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-2xl p-5 border border-white/[0.08] mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-gold/[0.06] to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-neutral-600 font-mono tracking-wider">DOSIS · WEEKLY RECAP</p>
            <p className="text-2xl font-extrabold text-white mt-1">SEMANA {THIS_WEEK.week}</p>
          </div>
          <div className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1">
            <span className="text-xs text-gold font-bold">LVL {THIS_WEEK.level} ⭐</span>
          </div>
        </div>

        {/* Habit bars */}
        <div className="space-y-3 mb-5">
          {THIS_WEEK.habits.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...SPRING, delay: 0.2 + i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-400">{h.name}</span>
                <span className="text-xs font-bold text-white">
                  {h.done}/{h.total}
                </span>
              </div>
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${h.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(h.done / h.total) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-px bg-white/[0.06] my-4" />

        {/* Earned vices */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider mb-2">Me he ganado</p>
          <div className="flex justify-center gap-2.5 text-2xl">
            {THIS_WEEK.vicesEarned.map((v, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.9 + i * 0.08 }}
              >
                {v}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Balance + stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/[0.03] rounded-lg p-2.5 text-center">
            <p className="text-lg font-extrabold text-emerald-400 flex items-center justify-center gap-1">
              +{THIS_WEEK.balance} <Coin size={12} />
            </p>
            <p className="text-[9px] text-neutral-500">Balance</p>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2.5 text-center">
            <p className="text-lg font-extrabold text-gold">#{THIS_WEEK.squadPosition}</p>
            <p className="text-[9px] text-neutral-500">En squad</p>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2.5 text-center">
            <p className="text-lg font-extrabold text-orange-400">🔥 {THIS_WEEK.bestStreak}</p>
            <p className="text-[9px] text-neutral-500">Mejor racha</p>
          </div>
        </div>

        {/* Share button */}
        <motion.button
          className="w-full mt-5 py-3 rounded-xl bg-gold text-black font-bold text-sm flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
        >
          📱 Compartir recap
        </motion.button>
      </motion.div>

      {/* Past weeks */}
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Semanas anteriores</h2>
      <div className="space-y-2 mb-8">
        {PAST_WEEKS.map((w, i) => (
          <motion.div
            key={i}
            className="bg-card border border-border rounded-xl px-4 py-3.5 flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
              <span className="text-xs font-bold text-neutral-400">S{w.week}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">Semana {w.week}</p>
                <span className="text-[10px] text-neutral-600">LVL {w.level}</span>
              </div>
              <p className="text-[10px] text-neutral-500 truncate">{w.highlight}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                +{w.balance} <Coin size={10} />
              </p>
              <p className="text-[10px] text-neutral-600">{w.score}% score</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
