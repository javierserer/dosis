'use client'

import { motion } from 'framer-motion'
import { Flame, TrendingUp, Zap, Calendar } from 'lucide-react'
import { WeeklyBars, StreakHeatmap } from '@/components/charts'

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 18 }

const THIS_WEEK = {
  week: 14,
  level: 12,
  balance: 420,
  streak: 14,
  habits: [
    { name: 'Gym', done: 5, total: 5 },
    { name: 'Lectura', done: 4, total: 7 },
    { name: 'Sin alcohol', done: 6, total: 7 },
    { name: 'Meditación', done: 3, total: 5 },
    { name: 'Madrugar', done: 4, total: 5 },
    { name: 'Mascarilla pelo', done: 1, total: 2 },
  ],
  squadPosition: 3,
  previousBalance: 380,
  dailyPts: [65, 80, 45, 90, 95, 30, 15],
}

const PERSONAL_BESTS = [
  { label: 'Mejor semana', value: '450 pts', icon: Zap },
  { label: 'Mejor día', value: '135 pts', icon: TrendingUp },
  { label: 'Mejor racha', value: '32 días', icon: Flame },
  { label: 'Días perfectos', value: '8', icon: Calendar },
]

const PAST_WEEKS = [
  { week: 13, pts: 380, pct: 78, highlight: '6/6 gym' },
  { week: 12, pts: 290, pct: 65, highlight: 'Primer duelo ganado' },
  { week: 11, pts: 450, pct: 88, highlight: 'Mejor semana' },
  { week: 10, pts: 320, pct: 72, highlight: 'Racha x3' },
]

export default function RecapPage() {
  const totalDone = THIS_WEEK.habits.reduce((s, h) => s + h.done, 0)
  const totalTotal = THIS_WEEK.habits.reduce((s, h) => s + h.total, 0)
  const completionRate = Math.round((totalDone / totalTotal) * 100)
  const balanceDiff = THIS_WEEK.balance - THIS_WEEK.previousBalance

  return (
    <div className="pt-14 px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Tu progreso</h1>
        <span className="text-xs text-muted">Semana {THIS_WEEK.week}</span>
      </div>

      {/* KPIs */}
      <motion.div
        className="bg-white rounded-2xl p-5 border border-border shadow-sm mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-accent">{completionRate}%</p>
            <p className="text-[10px] text-muted">Completado</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold">+{THIS_WEEK.balance}</p>
            <p className="text-[10px] text-muted">Puntos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-accent">#{THIS_WEEK.squadPosition}</p>
            <p className="text-[10px] text-muted">En squad</p>
          </div>
        </div>
        <div className="bg-surface rounded-xl px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-muted">vs semana anterior</span>
          </div>
          <span className={`text-xs font-bold ${balanceDiff >= 0 ? 'text-accent' : 'text-muted'}`}>
            {balanceDiff >= 0 ? '+' : ''}{balanceDiff} pts ({balanceDiff >= 0 ? '+' : ''}{Math.round((balanceDiff / THIS_WEEK.previousBalance) * 100)}%)
          </span>
        </div>
      </motion.div>

      {/* Activity: Heatmap + Weekly Bars combined */}
      <motion.div
        className="bg-white rounded-2xl p-4 border border-border shadow-sm mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-widest">Actividad</p>
          <div className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-accent" />
            <span className="text-[10px] text-accent font-bold">{THIS_WEEK.streak}d racha</span>
          </div>
        </div>
        <StreakHeatmap weeks={16} size="sm" />
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-3">Puntos por día</p>
          <WeeklyBars data={THIS_WEEK.dailyPts} maxHeight={70} />
        </div>
      </motion.div>

      {/* Habits breakdown */}
      <motion.div
        className="bg-white rounded-2xl p-5 border border-border shadow-sm mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.15 }}
      >
        <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-4">Hábitos</p>
        <div className="space-y-3">
          {THIS_WEEK.habits.map((h, i) => {
            const pct = (h.done / h.total) * 100
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: 0.2 + i * 0.06 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted">{h.name}</span>
                  <span className={`text-xs font-bold ${pct === 100 ? 'text-accent' : ''}`}>{h.done}/{h.total}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${pct === 100 ? 'bg-accent' : 'bg-accent/40'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Personal Bests — compact horizontal */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.2 }}
      >
        <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-3">Personal bests</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {PERSONAL_BESTS.map((pb, i) => (
            <motion.div
              key={i}
              className="shrink-0 bg-white border border-border rounded-xl px-3.5 py-3 shadow-sm min-w-[120px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
            >
              <pb.icon className="w-3.5 h-3.5 text-accent mb-1.5" />
              <p className="text-base font-extrabold leading-tight">{pb.value}</p>
              <p className="text-[9px] text-muted mt-0.5">{pb.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Past weeks */}
      <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-3">Semanas anteriores</p>
      <div className="space-y-2 mb-8">
        {PAST_WEEKS.map((w, i) => {
          const maxPts = Math.max(...PAST_WEEKS.map(p => p.pts))
          return (
            <motion.div
              key={i}
              className="bg-white border border-border rounded-xl px-4 py-3 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-muted tabular-nums w-7">S{w.week}</span>
                <div className="flex-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent/40 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(w.pts / maxPts) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                    />
                  </div>
                </div>
                <span className="text-xs font-bold text-accent tabular-nums">+{w.pts}</span>
              </div>
              <div className="flex items-center justify-between pl-10">
                <p className="text-[10px] text-muted">{w.highlight}</p>
                <p className="text-[10px] text-muted tabular-nums">{w.pct}%</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
