'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coin } from '@/components/shared'

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 200, damping: 22 }

const MEMBERS = [
  { pos: 1, name: 'Carlos', emoji: '🧔', coins: 1240, change: 0, badge: '🥇' },
  { pos: 2, name: 'María', emoji: '👩', coins: 980, change: 1, badge: '🥈' },
  { pos: 3, name: 'Tú', emoji: '🧑', coins: 850, change: -1, badge: '🥉', isYou: true },
  { pos: 4, name: 'David', emoji: '👨', coins: 320, change: 0, badge: '💀', isLast: true },
]

const SHAME_FEED = [
  { text: 'David no ha ido al gym hoy. Tercer día seguido.', time: 'Hace 2h', type: 'shame' as const },
  { text: 'Carlos completó todos sus hábitos 5 días seguidos', time: 'Hace 3h', type: 'pride' as const },
  { text: 'María desbloqueó el logro "Monje" — 30 días sin alcohol', time: 'Ayer', type: 'achievement' as const },
  { text: 'David usó un Shield para no romper racha 👀', time: 'Ayer', type: 'shame' as const },
  { text: 'Tú ganaste el duelo contra Carlos: +200 bonus', time: 'Hace 2 días', type: 'pride' as const },
]

const DUELS = [
  { challenger: 'María', challenge: '¿Quién corre más km?', stake: '1 cerveza', status: 'active' as const, you: '12km', them: '8km' },
  { challenger: 'Carlos', challenge: 'Más días de gym esta semana', stake: 'Pagar las cañas', status: 'pending' as const },
]

export default function SquadPage() {
  const [tab, setTab] = useState<'ranking' | 'feed' | 'duels'>('ranking')

  return (
    <div className="pt-14 px-5">
      {/* Squad header */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">Squad</p>
            <h1 className="text-xl font-bold text-white">Los Disciplinados</h1>
          </div>
          <div className="flex -space-x-2">
            {MEMBERS.map((m, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-card border-2 border-background flex items-center justify-center text-base"
              >
                {m.emoji}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-1">Semana 14 · Top 8% global</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card rounded-xl p-1 border border-border mb-5">
        {[
          { id: 'ranking' as const, label: 'Ranking', icon: '🏆' },
          { id: 'feed' as const, label: 'Feed', icon: '📢' },
          { id: 'duels' as const, label: 'Duelos', icon: '⚔️' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition ${
              tab === t.id ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {tab === 'ranking' && (
          <motion.div key="ranking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Weekly challenge */}
            <div className="bg-gradient-to-r from-vice/10 to-transparent border border-vice/20 rounded-xl p-4 mb-4">
              <p className="text-[10px] text-vice font-semibold uppercase tracking-wider">⚔️ Reto semanal</p>
              <p className="text-sm font-bold text-white mt-1">5 sesiones de gym</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-vice rounded-full" style={{ width: '40%' }} />
                </div>
                <span className="text-[10px] text-neutral-400">2/5</span>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="space-y-2">
              {MEMBERS.map((m, i) => (
                <motion.div
                  key={i}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 border ${
                    m.isYou
                      ? 'bg-gold/[0.06] border-gold/20'
                      : m.isLast
                      ? 'bg-red-500/[0.04] border-red-500/10'
                      : 'bg-card border-border'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="text-lg w-7 text-center">{m.badge}</span>
                  <span className="text-xl">{m.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className={`text-sm font-semibold ${m.isYou ? 'text-gold' : 'text-white'}`}>{m.name}</p>
                      {m.change !== 0 && (
                        <span className={`text-[10px] font-bold ${m.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {m.change > 0 ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                    {m.isLast && <p className="text-[10px] text-red-400 font-medium">Paga las cañas esta semana 🍻</p>}
                  </div>
                  <span className="text-sm font-bold text-neutral-400 flex items-center gap-1">
                    {m.coins.toLocaleString()} <Coin size={11} />
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Invite */}
            <motion.button
              className="w-full mt-4 py-3.5 rounded-xl border-2 border-dashed border-white/10 text-sm text-neutral-400 hover:text-white hover:border-gold/30 transition flex items-center justify-center gap-2"
              whileTap={{ scale: 0.97 }}
            >
              <span>👋</span> Invitar amigo al squad
            </motion.button>
          </motion.div>
        )}

        {tab === 'feed' && (
          <motion.div key="feed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="space-y-2">
              {SHAME_FEED.map((item, i) => (
                <motion.div
                  key={i}
                  className={`rounded-xl px-4 py-3 border ${
                    item.type === 'shame'
                      ? 'bg-red-500/[0.04] border-red-500/10'
                      : item.type === 'achievement'
                      ? 'bg-gold/[0.04] border-gold/10'
                      : 'bg-emerald-500/[0.04] border-emerald-500/10'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">
                      {item.type === 'shame' ? '👀' : item.type === 'achievement' ? '🏅' : '✨'}
                    </span>
                    <div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{item.text}</p>
                      <p className="text-[10px] text-neutral-600 mt-1">{item.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'duels' && (
          <motion.div key="duels" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="space-y-3">
              {DUELS.map((d, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">⚔️</span>
                      <p className="text-xs font-bold text-white">vs {d.challenger}</p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        d.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-gold/10 text-gold border border-gold/20'
                      }`}
                    >
                      {d.status === 'active' ? 'En curso' : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-300 mb-2">{d.challenge}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-vice font-medium">🎲 En juego: {d.stake}</p>
                    {d.status === 'active' && d.you && d.them && (
                      <p className="text-[10px] text-neutral-400">
                        Tú <span className="text-emerald-400 font-bold">{d.you}</span> vs{' '}
                        <span className="text-red-400 font-bold">{d.them}</span>
                      </p>
                    )}
                  </div>
                  {d.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <motion.button
                        className="flex-1 py-2 rounded-lg bg-gold text-black text-xs font-bold"
                        whileTap={{ scale: 0.95 }}
                      >
                        Aceptar
                      </motion.button>
                      <button className="flex-1 py-2 rounded-lg border border-border text-xs text-neutral-400">
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <motion.button
              className="w-full mt-4 py-3.5 rounded-xl bg-vice/10 border border-vice/20 text-sm text-vice font-semibold flex items-center justify-center gap-2"
              whileTap={{ scale: 0.97 }}
            >
              ⚔️ Retar a alguien
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
