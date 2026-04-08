'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coin } from '@/components/shared'

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 200, damping: 22 }

interface Habit {
  id: number
  name: string
  emoji: string
  coins: number
  streak: number
  completionRate: number
  active: boolean
  category: 'fitness' | 'mente' | 'salud' | 'productividad'
}

const INITIAL_HABITS: Habit[] = [
  { id: 1, name: 'Gym 1h', emoji: '🏋️', coins: 80, streak: 14, completionRate: 92, active: true, category: 'fitness' },
  { id: 2, name: 'Correr 5km', emoji: '🏃', coins: 60, streak: 3, completionRate: 45, active: true, category: 'fitness' },
  { id: 3, name: 'Leer 30min', emoji: '📖', coins: 40, streak: 8, completionRate: 71, active: true, category: 'mente' },
  { id: 4, name: 'Meditar 10min', emoji: '🧘', coins: 20, streak: 5, completionRate: 60, active: true, category: 'mente' },
  { id: 5, name: 'Sin alcohol', emoji: '🚫', coins: 25, streak: 21, completionRate: 85, active: true, category: 'salud' },
  { id: 6, name: 'Madrugar antes de 7', emoji: '⏰', coins: 30, streak: 2, completionRate: 38, active: true, category: 'productividad' },
  { id: 7, name: 'Beber 2L agua', emoji: '💧', coins: 15, streak: 10, completionRate: 78, active: false, category: 'salud' },
  { id: 8, name: 'Estiramientos', emoji: '🤸', coins: 15, streak: 0, completionRate: 0, active: false, category: 'fitness' },
]

const CATEGORIES = [
  { id: 'all', label: 'Todos', emoji: '⚡' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'mente', label: 'Mente', emoji: '🧠' },
  { id: 'salud', label: 'Salud', emoji: '💚' },
  { id: 'productividad', label: 'Productividad', emoji: '🎯' },
]

const SUGGESTIONS = [
  { name: 'Yoga 20min', emoji: '🧘‍♀️', coins: 25 },
  { name: 'No redes sociales', emoji: '📵', coins: 30 },
  { name: 'Cocinar en casa', emoji: '👨‍🍳', coins: 20 },
  { name: 'Journaling', emoji: '📝', coins: 15 },
  { name: 'Cold shower', emoji: '🥶', coins: 35 },
  { name: 'Pasear 30min', emoji: '🚶', coins: 20 },
]

export default function HabitsPage() {
  const [habits, setHabits] = useState(INITIAL_HABITS)
  const [filter, setFilter] = useState('all')
  const [showAdd, setShowAdd] = useState(false)

  const toggleActive = (id: number) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, active: !h.active } : h)))
  }

  const filtered = filter === 'all' ? habits : habits.filter((h) => h.category === filter)
  const activeHabits = filtered.filter((h) => h.active)
  const inactiveHabits = filtered.filter((h) => !h.active)
  const totalDaily = habits.filter((h) => h.active).reduce((s, h) => s + h.coins, 0)

  return (
    <div className="pt-14 px-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-white">Hábitos</h1>
        <motion.button
          onClick={() => setShowAdd(!showAdd)}
          className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-lg"
          whileTap={{ scale: 0.9 }}
        >
          {showAdd ? '×' : '+'}
        </motion.button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-5">
        <p className="text-xs text-neutral-500">
          <span className="text-white font-semibold">{habits.filter((h) => h.active).length}</span> activos
        </p>
        <p className="text-xs text-neutral-500">
          Potencial diario:{' '}
          <span className="text-gold font-semibold flex items-center gap-1 inline-flex">
            {totalDaily} <Coin size={10} />
          </span>
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-5 px-5 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition border ${
              filter === cat.id
                ? 'bg-white/10 border-white/20 text-white'
                : 'border-border text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Add habit panel */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Sugerencias</p>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={i}
                    className="flex items-center gap-2 bg-white/[0.03] border border-border rounded-xl px-3 py-2.5 text-left hover:border-gold/20 transition"
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="text-lg">{s.emoji}</span>
                    <div>
                      <p className="text-xs text-white font-medium">{s.name}</p>
                      <p className="text-[10px] text-gold flex items-center gap-0.5">
                        +{s.coins} <Coin size={8} />
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active habits */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">Activos</p>
        <div className="space-y-2">
          {activeHabits.map((h) => (
            <motion.div
              key={h.id}
              className="bg-card border border-border rounded-xl px-4 py-3.5 flex items-center gap-3"
              layout
              whileHover={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <span className="text-xl">{h.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white truncate">{h.name}</p>
                  {h.streak > 0 && (
                    <span className="text-[10px] text-orange-400 font-bold shrink-0">🔥 {h.streak}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-gold font-bold flex items-center gap-0.5">
                    +{h.coins} <Coin size={8} />
                  </span>
                  <span className="text-[10px] text-neutral-600">·</span>
                  <span className="text-[10px] text-neutral-500">{h.completionRate}% completado</span>
                </div>
                {/* Mini progress bar */}
                <div className="h-1 bg-white/[0.04] rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${h.completionRate}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => toggleActive(h.id)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-xs text-neutral-500 hover:text-red-400 hover:border-red-500/20 transition shrink-0"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inactive habits */}
      {inactiveHabits.length > 0 && (
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-2">Inactivos</p>
          <div className="space-y-2">
            {inactiveHabits.map((h) => (
              <div
                key={h.id}
                className="bg-card/50 border border-border/50 rounded-xl px-4 py-3 flex items-center gap-3 opacity-50"
              >
                <span className="text-lg">{h.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm text-neutral-400">{h.name}</p>
                  <p className="text-[10px] text-neutral-600 flex items-center gap-0.5">
                    +{h.coins} <Coin size={8} />
                  </p>
                </div>
                <motion.button
                  onClick={() => toggleActive(h.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold"
                  whileTap={{ scale: 0.95 }}
                >
                  Activar
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
