'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '@/components/shared'
import Link from 'next/link'

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 18 }

const STATS = [
  { label: 'Monedas totales', value: '12.480' },
  { label: 'Hábitos completados', value: '847' },
  { label: 'Vicios ganados', value: '94' },
  { label: 'Duelos ganados', value: '12' },
  { label: 'Mejor racha', value: '32d' },
  { label: 'Semanas activo', value: '14' },
]

const ACHIEVEMENTS = [
  { name: 'Ironman', desc: '30 días de gym seguidos', unlocked: true },
  { name: 'Monje', desc: '30 días sin alcohol', unlocked: false, progress: 21 },
  { name: 'Duelista', desc: 'Gana 10 duelos', unlocked: true },
  { name: 'Madrugador', desc: '21 días levantándote antes de las 7', unlocked: false, progress: 14 },
  { name: 'Influencer', desc: 'Invita a 5 amigos', unlocked: false, progress: 3 },
  { name: 'Sin deuda', desc: 'Nunca en saldo negativo durante 4 semanas', unlocked: true },
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
        <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-lg font-bold text-neutral-400">
          JA
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">Javier</h1>
          <p className="text-xs text-neutral-500">@javier · Miembro desde feb 2026</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-gold font-bold bg-gold/10 border border-gold/20 rounded-full px-2.5 py-0.5">
              LVL 23
            </span>
            <span className="text-xs text-neutral-400 font-bold">14d racha</span>
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
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-[10px] text-neutral-600 mt-1.5 tabular-nums">1.440 / 2.000 XP</p>
      </motion.div>

      {/* Lifetime stats */}
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Estadísticas</h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="bg-card border border-border rounded-xl p-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <p className="text-lg font-extrabold text-white">{s.value}</p>
            <p className="text-[9px] text-neutral-500 leading-tight mt-0.5">{s.label}</p>
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
              a.unlocked ? 'border-gold/15' : 'border-border opacity-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
              a.unlocked ? 'bg-gold/10 text-gold' : 'bg-white/[0.04] text-neutral-600'
            }`}>
              {a.unlocked ? '✓' : '·'}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${a.unlocked ? 'text-white' : 'text-neutral-400'}`}>{a.name}</p>
              <p className="text-[10px] text-neutral-500">{a.desc}</p>
              {!a.unlocked && a.progress !== undefined && (
                <div className="h-1 bg-white/[0.06] rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gold/40 rounded-full"
                    style={{ width: `${(a.progress / 30) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invitations */}
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Tus invitaciones</h2>
      <div className="bg-card border border-gold/15 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold text-white">Invitaciones disponibles</p>
            <p className="text-xs text-neutral-500 mt-0.5">Elige bien. No hay más.</p>
          </div>
          <p className="text-2xl font-extrabold text-gold">3 <span className="text-sm text-neutral-500 font-normal">/ 5</span></p>
        </div>

        {/* Invite link */}
        <div className="flex gap-2">
          <div className="flex-1 bg-background border border-border rounded-lg px-3 py-2.5 text-xs text-neutral-400 font-mono truncate">
            getdosis.com/i/JAV-X8K2
          </div>
          <motion.button
            onClick={copyLink}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition shrink-0 ${
              copied ? 'bg-gold/20 text-gold' : 'bg-gold text-black'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? 'Copiado' : 'Copiar'}
          </motion.button>
        </div>
      </div>

      {/* Earn more invites */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <p className="text-sm font-bold text-white mb-3">Gana más invitaciones</p>
        <div className="space-y-2.5">
          {[
            { action: 'Racha de 30 días', reward: '+2', progress: 14, total: 30, done: false },
            { action: 'Ganar 3 duelos', reward: '+1', progress: 2, total: 3, done: false },
            { action: 'Squad en top 10%', reward: '+1', progress: 1, total: 1, done: true },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${item.done ? 'bg-gold/[0.04]' : 'bg-white/[0.02]'}`}>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white font-medium">{item.action}</p>
                  <span className={`text-[10px] font-bold ${item.done ? 'text-gold' : 'text-neutral-400'}`}>
                    {item.done ? 'Conseguido' : item.reward}
                  </span>
                </div>
                {!item.done && (
                  <div className="h-1 bg-white/[0.06] rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-gold/40 rounded-full" style={{ width: `${(item.progress / item.total) * 100}%` }} />
                  </div>
                )}
              </div>
            </div>
          ))}
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
        className="block w-full text-center py-3 rounded-xl border border-border text-neutral-500 text-sm font-medium hover:text-red-400 hover:border-red-500/20 transition mb-8"
      >
        Cerrar sesión
      </Link>

      <div className="text-center pb-4">
        <Logo size="sm" />
        <p className="text-[10px] text-neutral-700 mt-1">v0.1.0</p>
      </div>
    </div>
  )
}
