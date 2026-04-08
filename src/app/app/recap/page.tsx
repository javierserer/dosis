'use client'

import { motion } from 'framer-motion'
import { Coin } from '@/components/shared'

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 18 }

const THIS_WEEK = {
  week: 14,
  level: 23,
  balance: 420,
  habits: [
    { name: 'Gym', done: 5, total: 5 },
    { name: 'Lectura', done: 4, total: 7 },
    { name: 'Sin alcohol', done: 6, total: 7 },
    { name: 'Meditación', done: 3, total: 5 },
    { name: 'Madrugar', done: 4, total: 5 },
    { name: 'Mascarilla pelo', done: 1, total: 2 },
  ],
  squadPosition: 3,
  bestStreak: 14,
  previousBalance: 380,
}

const PAST_WEEKS = [
  { week: 13, level: 22, balance: 380, score: 78, highlight: '6/6 gym' },
  { week: 12, level: 21, balance: 290, score: 65, highlight: 'Primer duelo ganado' },
  { week: 11, level: 20, balance: 450, score: 88, highlight: 'Mejor semana del mes' },
  { week: 10, level: 19, balance: 320, score: 72, highlight: 'Racha x3 conseguida' },
  { week: 9, level: 18, balance: 180, score: 45, highlight: 'Semana floja' },
]

export default function RecapPage() {
  const totalDone = THIS_WEEK.habits.reduce((s, h) => s + h.done, 0)
  const totalTotal = THIS_WEEK.habits.reduce((s, h) => s + h.total, 0)
  const completionRate = Math.round((totalDone / totalTotal) * 100)
  const balanceDiff = THIS_WEEK.balance - THIS_WEEK.previousBalance

  return (
    <div className="pt-14 px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-white">Tu progreso</h1>
        <span className="text-xs text-neutral-500">Semana {THIS_WEEK.week}</span>
      </div>

      {/* Current week summary */}
      <motion.div
        className="bg-card rounded-2xl p-5 border border-border mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-gold">{completionRate}%</p>
            <p className="text-[10px] text-neutral-500">Completado</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-white flex items-center justify-center gap-1">
              +{THIS_WEEK.balance} <Coin size={14} />
            </p>
            <p className="text-[10px] text-neutral-500">Balance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-gold">#{THIS_WEEK.squadPosition}</p>
            <p className="text-[10px] text-neutral-500">En squad</p>
          </div>
        </div>

        {/* Trend */}
        <div className="bg-white/[0.03] rounded-xl px-4 py-2.5 flex items-center justify-between mb-5">
          <span className="text-xs text-neutral-400">vs semana anterior</span>
          <span className={`text-xs font-bold ${balanceDiff >= 0 ? 'text-gold' : 'text-neutral-500'}`}>
            {balanceDiff >= 0 ? '+' : ''}{balanceDiff} puntos ({balanceDiff >= 0 ? '+' : ''}{Math.round((balanceDiff / THIS_WEEK.previousBalance) * 100)}%)
          </span>
        </div>

        {/* Habit bars */}
        <div className="space-y-3">
          {THIS_WEEK.habits.map((h, i) => {
            const pct = (h.done / h.total) * 100
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: 0.1 + i * 0.06 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-neutral-400">{h.name}</span>
                  <span className={`text-xs font-bold ${pct === 100 ? 'text-gold' : 'text-white'}`}>
                    {h.done}/{h.total}
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${pct === 100 ? 'bg-gold' : 'bg-gold/40'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Streak + Level */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-extrabold text-gold">{THIS_WEEK.bestStreak}d</p>
          <p className="text-[10px] text-neutral-500">Racha actual</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-extrabold text-white">LVL {THIS_WEEK.level}</p>
          <p className="text-[10px] text-neutral-500">Nivel</p>
        </div>
      </div>

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
              <span className="text-xs font-bold text-neutral-400 tabular-nums">S{w.week}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">Semana {w.week}</p>
                <span className="text-[10px] text-neutral-600">LVL {w.level}</span>
              </div>
              <p className="text-[10px] text-neutral-500 truncate">{w.highlight}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-gold flex items-center gap-1 tabular-nums">
                +{w.balance} <Coin size={10} />
              </p>
              <p className="text-[10px] text-neutral-600 tabular-nums">{w.score}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
