'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coin, Logo } from '@/components/shared'
import Link from 'next/link'

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 18 }

const STATS = [
  { label: 'Monedas totales', value: '12.480', icon: '🪙' },
  { label: 'Hábitos completados', value: '847', icon: '✅' },
  { label: 'Vicios ganados', value: '94', icon: '🍺' },
  { label: 'Duelos ganados', value: '12', icon: '⚔️' },
  { label: 'Mejor racha', value: '32 días', icon: '🔥' },
  { label: 'Semanas activo', value: '14', icon: '📅' },
]

const ACHIEVEMENTS = [
  { name: 'Ironman', desc: '30 días de gym seguidos', emoji: '💪', unlocked: true },
  { name: 'Monje', desc: '30 días sin alcohol', emoji: '🧘', unlocked: false, progress: 21 },
  { name: 'Duelista', desc: 'Gana 10 duelos', emoji: '⚔️', unlocked: true },
  { name: 'Madrugador', desc: '21 días levantándote antes de las 7', emoji: '🌅', unlocked: false, progress: 14 },
  { name: 'Influencer', desc: 'Invita a 5 amigos', emoji: '📱', unlocked: false, progress: 3 },
  { name: 'Sin deuda', desc: 'Nunca en saldo negativo durante 4 semanas', emoji: '💎', unlocked: true },
]

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const xpProgress = 72

  return (
    <div className="pt-14 px-5">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-vice/20 border border-white/10 flex items-center justify-center text-3xl">
          🧑
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">Javier</h1>
          <p className="text-xs text-neutral-500">@javier · Miembro desde feb 2026</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-gold font-bold bg-gold/10 border border-gold/20 rounded-full px-2 py-0.5">
              LVL 23 ⭐
            </span>
            <span className="text-xs text-orange-400 font-bold">🔥 14 días</span>
          </div>
        </div>
      </div>

      {/* XP bar */}
      <motion.div
        className="bg-card border border-border rounded-xl p-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-neutral-400">Progreso a LVL 24</span>
          <span className="text-xs text-gold font-bold">{xpProgress}%</span>
        </div>
        <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold via-amber-500 to-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-[10px] text-neutral-600 mt-1.5">1.440 / 2.000 XP</p>
      </motion.div>

      {/* Lifetime stats */}
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Estadísticas</h2>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="bg-card border border-border rounded-xl p-3.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-lg">{s.icon}</span>
            <p className="text-lg font-extrabold text-white mt-1">{s.value}</p>
            <p className="text-[10px] text-neutral-500">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Logros</h2>
      <div className="space-y-2 mb-6">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={i}
            className={`bg-card border rounded-xl px-4 py-3 flex items-center gap-3 ${
              a.unlocked ? 'border-gold/20' : 'border-border opacity-60'
            }`}
          >
            <span className="text-2xl">{a.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-semibold ${a.unlocked ? 'text-white' : 'text-neutral-400'}`}>{a.name}</p>
                {a.unlocked && <span className="text-[10px] text-gold font-bold">✓</span>}
              </div>
              <p className="text-[10px] text-neutral-500">{a.desc}</p>
              {!a.unlocked && a.progress !== undefined && (
                <div className="h-1 bg-white/[0.06] rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gold/50 rounded-full"
                    style={{ width: `${(a.progress / 30) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invite friends */}
      <div className="bg-gradient-to-r from-vice/10 to-gold/10 border border-white/10 rounded-2xl p-5 mb-6">
        <p className="text-sm font-bold text-white mb-1">Invita a tus amigos</p>
        <p className="text-xs text-neutral-400 mb-3">
          Cada amigo que se una te da <span className="text-gold font-semibold">200 monedas</span> gratis.
        </p>
        <div className="flex gap-2">
          <div className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-xs text-neutral-400 font-mono truncate">
            dosis.app/invite/javier
          </div>
          <motion.button
            onClick={copyLink}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              copied ? 'bg-emerald-500 text-white' : 'bg-gold text-black'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </motion.button>
        </div>
      </div>

      {/* Settings */}
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Ajustes</h2>
      <div className="bg-card border border-border rounded-xl divide-y divide-border mb-6">
        {[
          { label: 'Notificaciones de vergüenza', desc: 'Tu squad ve cuando fallas', enabled: true },
          { label: 'Recordatorios diarios', desc: 'A las 9:00 y 21:00', enabled: true },
          { label: 'Perfil público', desc: 'Visible en rankings globales', enabled: false },
        ].map((setting, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3.5">
            <div>
              <p className="text-sm text-white">{setting.label}</p>
              <p className="text-[10px] text-neutral-500">{setting.desc}</p>
            </div>
            <div
              className={`w-10 h-6 rounded-full transition-colors relative ${
                setting.enabled ? 'bg-gold' : 'bg-neutral-700'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  setting.enabled ? 'translate-x-[18px]' : 'translate-x-0.5'
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <Link
        href="/"
        className="block w-full text-center py-3 rounded-xl border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/5 transition mb-8"
      >
        Cerrar sesión
      </Link>

      <div className="text-center pb-4">
        <Logo size="sm" />
        <p className="text-[10px] text-neutral-700 mt-1">v0.1.0 · La disciplina es el nuevo lujo</p>
      </div>
    </div>
  )
}
