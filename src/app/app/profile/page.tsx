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

      {/* Invitations */}
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Tus invitaciones</h2>
      <div className="bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border border-gold/20 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold text-white">Invitaciones disponibles</p>
            <p className="text-xs text-neutral-500 mt-0.5">Elige bien. No hay más.</p>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  i <= 3 ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-white/5 text-neutral-600 border border-border'
                }`}
              >
                {i <= 3 ? '🎫' : '·'}
              </div>
            ))}
          </div>
        </div>

        <p className="text-3xl font-extrabold text-gold mb-1">3 <span className="text-base text-neutral-500 font-normal">/ 5</span></p>
        <p className="text-[10px] text-neutral-500 mb-4">2 usadas · 3 restantes</p>

        {/* Invite link */}
        <div className="flex gap-2">
          <div className="flex-1 bg-card border border-border rounded-lg px-3 py-2.5 text-xs text-neutral-400 font-mono truncate">
            dosis.app/i/JAV-X8K2
          </div>
          <motion.button
            onClick={copyLink}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition shrink-0 ${
              copied ? 'bg-emerald-500 text-white' : 'bg-gold text-black'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </motion.button>
        </div>
      </div>

      {/* Invite tree */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-white">🌳 Tu árbol</p>
          <span className="text-xs text-gold font-bold">12 personas</span>
        </div>
        <div className="space-y-2">
          {/* Level 1: Direct invites */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gold" />
            </div>
            <span className="text-xs text-white font-medium">Tú</span>
          </div>
          {[
            { name: 'Carlos', tree: 4, active: true },
            { name: 'María', tree: 6, active: true },
          ].map((inv, i) => (
            <div key={i} className="ml-5">
              <div className="flex items-center gap-2 border-l border-border pl-3 py-1">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-neutral-300">{inv.name}</span>
                <span className="text-[10px] text-neutral-600">→ {inv.tree} invitados</span>
              </div>
              {/* Level 2: Their invites (condensed) */}
              <div className="ml-5 border-l border-border/50 pl-3 py-1">
                <span className="text-[10px] text-neutral-600">
                  {inv.tree} personas en su árbol...
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-border text-center">
          <p className="text-[10px] text-neutral-500">
            Tu árbol está en el <span className="text-gold font-bold">top 15%</span> de todos los usuarios
          </p>
        </div>
      </div>

      {/* Earn more invites */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <p className="text-sm font-bold text-white mb-3">Gana más invitaciones</p>
        <div className="space-y-2.5">
          {[
            { action: 'Racha de 30 días', reward: '+2', progress: 14, total: 30, emoji: '🔥' },
            { action: 'Ganar 3 duelos', reward: '+1', progress: 2, total: 3, emoji: '⚔️' },
            { action: 'Squad en top 10%', reward: '+1', progress: 1, total: 1, emoji: '🏆', done: true },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${item.done ? 'bg-emerald-500/5 border border-emerald-500/10' : 'bg-white/[0.02]'}`}>
              <span className="text-lg">{item.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white font-medium">{item.action}</p>
                  <span className={`text-[10px] font-bold ${item.done ? 'text-emerald-400' : 'text-gold'}`}>
                    {item.done ? '✓ Conseguido' : item.reward}
                  </span>
                </div>
                {!item.done && (
                  <div className="h-1 bg-white/[0.06] rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-gold/50 rounded-full" style={{ width: `${(item.progress / item.total) * 100}%` }} />
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
