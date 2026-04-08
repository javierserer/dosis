'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coin } from '@/components/shared'

const SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 }

interface Habit {
  id: number
  name: string
  coins: number
  streak: number
  completionRate: number
  active: boolean
  frequency: string
  difficulty: string
}

const DIFFICULTIES = [
  { id: 'easy', label: 'Fácil', coins: 15, desc: 'Beber agua, estirar, vitaminas...' },
  { id: 'normal', label: 'Normal', coins: 30, desc: 'Leer, meditar, cocinar...' },
  { id: 'hard', label: 'Difícil', coins: 50, desc: 'Gym, correr, madrugar...' },
  { id: 'beast', label: 'Bestia', coins: 80, desc: 'Ayuno, cold shower, doble sesión...' },
]

const INITIAL_HABITS: Habit[] = [
  { id: 1, name: 'Gym 1h', coins: 50, streak: 14, completionRate: 92, active: true, frequency: 'Diario', difficulty: 'hard' },
  { id: 2, name: 'Leer 30min', coins: 30, streak: 8, completionRate: 71, active: true, frequency: 'Diario', difficulty: 'normal' },
  { id: 3, name: 'Sin alcohol', coins: 30, streak: 21, completionRate: 85, active: true, frequency: 'Diario', difficulty: 'normal' },
  { id: 4, name: 'Madrugar antes de las 7', coins: 50, streak: 2, completionRate: 38, active: true, frequency: 'Diario', difficulty: 'hard' },
  { id: 5, name: 'Meditar 10min', coins: 15, streak: 5, completionRate: 60, active: true, frequency: 'Diario', difficulty: 'easy' },
  { id: 6, name: 'Mascarilla pelo', coins: 15, streak: 3, completionRate: 45, active: true, frequency: '2x semana', difficulty: 'easy' },
  { id: 7, name: 'Correr 5km', coins: 50, streak: 0, completionRate: 0, active: false, frequency: '3x semana', difficulty: 'hard' },
]

export default function HabitsPage() {
  const [habits, setHabits] = useState(INITIAL_HABITS)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDifficulty, setNewDifficulty] = useState('')
  const [newFrequency, setNewFrequency] = useState('Diario')

  const toggleActive = (id: number) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, active: !h.active } : h)))
  }

  const addHabit = () => {
    if (!newName.trim() || !newDifficulty) return
    const diff = DIFFICULTIES.find((d) => d.id === newDifficulty)
    if (!diff) return
    const habit: Habit = {
      id: Date.now(),
      name: newName.trim(),
      coins: diff.coins,
      streak: 0,
      completionRate: 0,
      active: true,
      frequency: newFrequency,
      difficulty: newDifficulty,
    }
    setHabits((prev) => [habit, ...prev])
    setNewName('')
    setNewDifficulty('')
    setNewFrequency('Diario')
    setShowAdd(false)
  }

  const activeHabits = habits.filter((h) => h.active)
  const inactiveHabits = habits.filter((h) => !h.active)
  const totalDaily = activeHabits.reduce((s, h) => s + h.coins, 0)

  return (
    <div className="pt-14 px-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold text-white">Hábitos</h1>
        <motion.button
          onClick={() => setShowAdd(!showAdd)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-light transition ${
            showAdd ? 'bg-white/10 text-white' : 'bg-card border border-border text-neutral-400'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {showAdd ? '×' : '+'}
        </motion.button>
      </div>

      <p className="text-xs text-neutral-500 mb-5">
        {activeHabits.length} activos · Potencial diario: <span className="text-gold font-semibold">{totalDaily}</span> puntos
      </p>

      {/* Add custom habit */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-5"
          >
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm font-semibold text-white mb-4">Nuevo hábito</p>

              {/* Name */}
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nombre del hábito (ej: No-fap, Yoga, Journaling...)"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-gold/40 transition mb-3"
                autoFocus
              />

              {/* Frequency */}
              <p className="text-xs text-neutral-500 mb-2">Frecuencia</p>
              <div className="flex gap-2 mb-4">
                {['Diario', '3x semana', '2x semana', '1x semana'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setNewFrequency(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                      newFrequency === f
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'border-border text-neutral-500'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Difficulty → Coins */}
              <p className="text-xs text-neutral-500 mb-2">Dificultad (determina los puntos)</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setNewDifficulty(d.id)}
                    className={`px-3 py-3 rounded-xl text-left transition border ${
                      newDifficulty === d.id
                        ? 'bg-gold/5 border-gold/30'
                        : 'border-border hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-white">{d.label}</span>
                      <span className="text-xs font-bold text-gold">+{d.coins}</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">{d.desc}</p>
                  </button>
                ))}
              </div>

              {/* Submit */}
              <motion.button
                onClick={addHabit}
                disabled={!newName.trim() || !newDifficulty}
                className="w-full py-3 rounded-xl bg-gold text-black font-bold text-sm disabled:opacity-20 transition"
                whileTap={{ scale: 0.97 }}
              >
                Añadir hábito
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active habits */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-3">Activos</p>
        <div className="space-y-2">
          {activeHabits.map((h) => (
            <motion.div
              key={h.id}
              className="bg-card border border-border rounded-xl px-4 py-3.5 flex items-center gap-3"
              layout
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white truncate">{h.name}</p>
                  {h.streak > 0 && (
                    <span className="text-[10px] text-gold font-bold shrink-0">{h.streak}d</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                  <span>{h.frequency}</span>
                  <span>·</span>
                  <span className="text-gold font-semibold">+{h.coins}</span>
                  <span>·</span>
                  <span>{h.completionRate}%</span>
                </div>
                <div className="h-1 bg-white/[0.04] rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gold/40 rounded-full transition-all"
                    style={{ width: `${h.completionRate}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => toggleActive(h.id)}
                className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-[10px] text-neutral-600 hover:text-red-400 hover:border-red-500/20 transition shrink-0"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inactive habits */}
      {inactiveHabits.length > 0 && (
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-3">Pausados</p>
          <div className="space-y-2">
            {inactiveHabits.map((h) => (
              <div key={h.id} className="bg-card/50 border border-border/50 rounded-xl px-4 py-3 flex items-center gap-3 opacity-50">
                <div className="flex-1">
                  <p className="text-sm text-neutral-400">{h.name}</p>
                  <p className="text-[10px] text-neutral-600">
                    {h.frequency} · +{h.coins}
                  </p>
                </div>
                <motion.button
                  onClick={() => toggleActive(h.id)}
                  className="px-3 py-1.5 rounded-lg border border-gold/20 text-[10px] text-gold font-semibold"
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
