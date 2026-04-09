'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeIn, Logo, SPRING } from '@/components/shared'
import { StreakHeatmap, WeeklyBars, ComparisonBars } from '@/components/charts'
import {
  Flame, Heart, BarChart3, Trophy,
  Check, ArrowRight, Zap, Swords, Calendar, TrendingUp,
} from 'lucide-react'

/* ================================================================
   MOCK DATA FOR LANDING VISUALS
   ================================================================ */

const PHONE_HEATMAP = [
  0,25,50,0,70,30,0,
  20,40,60,25,80,0,0,
  35,55,75,40,85,50,0,
  45,65,90,55,95,60,20,
  55,75,100,65,85,45,15,
  65,85,100,75,100,55,25,
  80,90,100,85,100,70,40,
  90,100,95,100,100,80,55,
]

const SHOWCASE_HEATMAP = [
  0,0,30,0,50,0,0, 0,25,45,0,60,20,0, 15,35,55,25,70,0,0, 25,45,65,35,80,40,0,
  35,55,75,45,85,50,0, 45,65,85,55,95,60,25, 55,75,100,65,85,45,15, 45,65,80,55,90,70,35,
  65,85,100,75,100,55,25, 55,75,85,65,100,70,40, 75,90,100,80,100,65,45, 70,80,100,85,100,75,55,
  75,85,100,80,100,65,35, 85,100,90,100,100,75,45, 80,90,100,85,100,80,55, 95,100,90,100,100,85,65,
]

const SHOWCASE_WEEKLY = [85, 110, 65, 120, 95, 45, 0]

/* ================================================================
   PHONE FRAME
   ================================================================ */

function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-[280px] h-[560px] bg-gray-900 rounded-[3rem] p-[6px] shadow-2xl shadow-gray-300/40 border border-gray-200 ${className}`}>
      <div className="w-full h-full bg-white rounded-[2.6rem] overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-gray-900 rounded-b-2xl z-10" />
        {children}
      </div>
    </div>
  )
}

/* ================================================================
   NAVBAR
   ================================================================ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Logo size="sm" />
        <div className="flex items-center gap-6">
          <a href="#como-funciona" className="hidden sm:block text-sm text-muted hover:text-foreground transition">
            Cómo funciona
          </a>
          <a href="#equipos" className="hidden sm:block text-sm text-muted hover:text-foreground transition">
            Equipos
          </a>
          <a
            href="/access"
            className="px-4 py-2 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent-light transition"
          >
            Únete
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ================================================================
   HERO
   ================================================================ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16">
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-muted mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.1 }}
          >
            <Flame className="w-3.5 h-3.5 text-accent" />
            Solo por invitación
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.2 }}
          >
            Sube de
            <br />
            <span className="text-accent">nivel.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.35 }}
          >
            Registra hábitos. Gana puntos. Compite con tu grupo.
            <br className="hidden sm:block" />{' '}
            <span className="text-foreground font-medium">
              Marca lo que haces cada día, sube de nivel y reta a tus amigos.
            </span>
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.5 }}
          >
            <a
              href="/access"
              className="px-8 py-3.5 rounded-full bg-accent text-white font-bold text-base hover:bg-accent-light transition hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
            >
              Tengo invitación <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#como-funciona"
              className="px-6 py-3.5 rounded-full border border-border text-foreground font-semibold text-base hover:bg-surface transition text-center"
            >
              Cómo funciona
            </a>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-col items-center lg:items-start gap-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['CA', 'MA', 'JA', 'DA', 'LU'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-surface border-2 border-white flex items-center justify-center text-[9px] font-bold text-muted"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="text-foreground font-semibold">4.847</span> personas dentro
              </p>
            </div>
            <a href="/access?waitlist=1" className="text-xs text-gray-400 hover:text-muted transition">
              ¿No tienes invitación?
            </a>
          </motion.div>
        </div>

        {/* Phone mockup — dashboard with heatmap */}
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ ...SPRING, delay: 0.3 }}
        >
          <PhoneFrame>
            <div className="pt-10 px-4 pb-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-extrabold tracking-tight text-gray-900">
                  <span className="text-accent">N</span>IVEL
                </span>
                <div className="flex items-center gap-1.5 text-xs text-accent font-bold">
                  <Flame className="w-3.5 h-3.5" /> 14d
                </div>
              </div>

              {/* Level card */}
              <motion.div
                className="bg-gray-50 rounded-xl p-3 mb-3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-extrabold text-accent">12</span>
                  <span className="text-[9px] text-gray-400">1.440 / 2.000 XP</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '72%' } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </div>
              </motion.div>

              {/* Mini weekly bars */}
              <motion.div
                className="mb-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                <p className="text-[8px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Esta semana</p>
                <div className="flex items-end gap-1 h-8">
                  {[65, 80, 45, 90, 95, 30, 0].map((v, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-sm ${v === 0 ? 'bg-gray-100' : i === 4 ? 'bg-accent' : 'bg-accent/40'}`}
                      initial={{ height: 2 }}
                      animate={inView ? { height: Math.max((v / 100) * 32, 2) } : {}}
                      transition={{ delay: 1.0 + i * 0.05, duration: 0.4 }}
                    />
                  ))}
                </div>
                <div className="flex gap-1 mt-0.5">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
                    <span key={i} className={`flex-1 text-center text-[7px] ${i === 4 ? 'text-accent font-bold' : 'text-gray-400'}`}>{d}</span>
                  ))}
                </div>
              </motion.div>

              {/* Mini heatmap */}
              <motion.div
                className="mb-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.05 }}
              >
                <p className="text-[8px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Actividad</p>
                <StreakHeatmap weeks={8} size="sm" data={PHONE_HEATMAP} animated={false} />
              </motion.div>

              {/* Today habits (3) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.15 }}
              >
                <p className="text-[8px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Hoy</p>
                <div className="space-y-1.5">
                  {[
                    { name: 'Gym 1h', done: true, pts: 50 },
                    { name: 'Leer 30min', done: true, pts: 30 },
                    { name: 'Meditar 10min', done: false, pts: 15 },
                  ].map((h, i) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${h.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center ${h.done ? 'bg-green-500 text-white' : 'border border-gray-300'}`}>
                        {h.done && <Check className="w-2 h-2" />}
                      </div>
                      <span className={`text-[10px] flex-1 ${h.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{h.name}</span>
                      <span className={`text-[9px] font-bold ${h.done ? 'text-green-500' : 'text-gray-400'}`}>+{h.pts}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </PhoneFrame>

          {/* Floating badge — ánimos */}
          <motion.div
            className="absolute -right-6 top-28 bg-white border border-border rounded-xl p-3 shadow-lg w-44"
            initial={{ opacity: 0, x: 20, scale: 0.85 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ ...SPRING, delay: 1.5 }}
          >
            <motion.div
              animate={inView ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
                <span className="text-[10px] text-accent font-semibold">12 ánimos</span>
              </div>
              <p className="text-xs text-gray-700">Tu grupo celebra tu racha</p>
            </motion.div>
          </motion.div>

          {/* Floating badge — racha */}
          <motion.div
            className="absolute -left-4 bottom-32 bg-white border border-border rounded-xl p-3 shadow-lg"
            initial={{ opacity: 0, x: -20, scale: 0.85 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ ...SPRING, delay: 1.7 }}
          >
            <motion.div
              animate={inView ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] text-accent font-semibold">14 días seguidos</span>
              </div>
              <p className="text-xs text-gray-700 mt-0.5">Racha doble activa</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ================================================================
   ACTIVITY TICKER
   ================================================================ */

function ActivityTicker() {
  const activities = [
    'Carlos completó Gym 1h · +50 pts',
    'María desbloqueó racha de 30 días',
    'David recibió 8 ánimos por su racha',
    'Laura retó a Pablo · Running semanal',
    'Ana subió al nivel 15',
    'Los Disciplinados: mejor grupo esta semana',
    'Javier completó todos sus hábitos hoy',
    'Sara lleva 21 días sin fallar',
  ]

  return (
    <section className="py-8 overflow-hidden relative border-y border-border">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
      <div className="relative">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...activities, ...activities].map((n, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 text-sm text-muted"
            >
              <Zap className="w-3.5 h-3.5 text-accent shrink-0" />
              {n}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ================================================================
   APP SHOWCASE — replaces "How It Works"
   ================================================================ */

function AppShowcase() {
  const refA = useRef<HTMLDivElement>(null)
  const inViewA = useInView(refA, { once: true, margin: '-80px' })
  const refB = useRef<HTMLDivElement>(null)
  const inViewB = useInView(refB, { once: true, margin: '-80px' })

  const showcaseHabits = [
    { name: 'Gym 1h', done: 5, total: 7 },
    { name: 'Leer 30min', done: 7, total: 7 },
    { name: 'Meditar 10min', done: 4, total: 7 },
  ]

  return (
    <section id="como-funciona" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-16">
          <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Por dentro</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Así se ve tu progreso.
          </h2>
        </FadeIn>

        {/* Block A — Heatmap + KPIs */}
        <div
          ref={refA}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20"
        >
          <motion.div
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inViewA ? { opacity: 1, y: 0 } : {}}
            transition={SPRING}
          >
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-muted uppercase tracking-widest">Actividad</p>
                <div className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-accent" />
                  <span className="text-[10px] text-accent font-bold">23d racha</span>
                </div>
              </div>
              <StreakHeatmap weeks={16} size="md" data={SHOWCASE_HEATMAP} fullWidth />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[
                  { value: '142', label: 'Días activos', Icon: Calendar },
                  { value: '23d', label: 'Racha', Icon: Flame },
                  { value: '12', label: 'Nivel', Icon: TrendingUp },
                  { value: '4.280', label: 'Puntos', Icon: Zap },
                ].map((kpi, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-2.5 bg-gray-50 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inViewA ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...SPRING, delay: 0.3 + i * 0.08 }}
                  >
                    <kpi.Icon className="w-3.5 h-3.5 text-accent mx-auto mb-1" />
                    <p className="text-sm font-extrabold">{kpi.value}</p>
                    <p className="text-[8px] text-muted">{kpi.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 text-center lg:text-left max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={inViewA ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              Cada día cuenta.
            </h3>
            <p className="text-base text-muted leading-relaxed">
              Tu mapa de actividad muestra cada día que cumples. Verde es progreso, blanco es descanso.
              <span className="text-foreground font-medium"> Cuanto más constante, más se nota.</span>
            </p>
          </motion.div>
        </div>

        {/* Block B — Weekly recap + habit progress */}
        <div
          ref={refB}
          className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16"
        >
          <motion.div
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inViewB ? { opacity: 1, y: 0 } : {}}
            transition={SPRING}
          >
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-accent">87%</p>
                  <p className="text-[10px] text-muted">Completado</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold">+340</p>
                  <p className="text-[10px] text-muted">Puntos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-accent flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5" />14
                  </p>
                  <p className="text-[10px] text-muted">Racha</p>
                </div>
              </div>

              <WeeklyBars data={SHOWCASE_WEEKLY} maxHeight={60} accentToday={false} />

              <div className="mt-5 pt-4 border-t border-border space-y-3">
                <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-1">Hábitos esta semana</p>
                {showcaseHabits.map((h, i) => {
                  const pct = (h.done / h.total) * 100
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inViewB ? { opacity: 1, x: 0 } : {}}
                      transition={{ ...SPRING, delay: 0.3 + i * 0.08 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted">{h.name}</span>
                        <span className={`text-xs font-bold ${pct === 100 ? 'text-accent' : ''}`}>{h.done}/{h.total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${pct === 100 ? 'bg-accent' : 'bg-accent/40'}`}
                          initial={{ width: 0 }}
                          animate={inViewB ? { width: `${pct}%` } : {}}
                          transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 text-center lg:text-left max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={inViewB ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              Tu semana, de un vistazo.
            </h3>
            <p className="text-base text-muted leading-relaxed">
              Resumen semanal con tus puntos, racha y progreso por hábito.
              <span className="text-foreground font-medium"> Sabes exactamente cómo vas.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   TEAMS (formerly "Squads")
   ================================================================ */

function Teams() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const members = [
    { pos: 1, name: 'Carlos', pts: 1240, change: 0 },
    { pos: 2, name: 'María', pts: 980, change: 1 },
    { pos: 3, name: 'Tú', pts: 850, change: -1, isYou: true },
    { pos: 4, name: 'David', pts: 320, change: 0, isLast: true },
  ]

  return (
    <section id="equipos" className="py-24 sm:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Equipos</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                Tu grupo
                <br />
                te mantiene
                <br />
                <span className="text-muted">arriba.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-md mx-auto lg:mx-0">
                Crea un grupo con tus amigos. Compite cada semana. Daos ánimos.
                <span className="text-foreground font-medium"> El último invita a las cañas.</span>
              </p>
            </FadeIn>

            <div className="mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Trophy, text: 'Clasificación semanal', detail: 'Compite por ser el primero cada semana' },
                { icon: Swords, text: 'Retos 1 contra 1', detail: 'Reta a quien quieras. El que pierda, paga.' },
                { icon: BarChart3, text: 'Progreso compartido', detail: 'Ve cómo va todo tu grupo' },
              ].map((f, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.1}>
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{f.text}</p>
                      <p className="text-xs text-muted">{f.detail}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Visual cards */}
          <div className="shrink-0 w-[300px] space-y-4">
            {/* Ranking card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ ...SPRING, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl border border-border shadow-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold text-gray-900">Los Disciplinados</p>
                  <span className="text-[10px] text-accent font-semibold">Semana 14</span>
                </div>
                <div className="space-y-2">
                  {members.map((m, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                        m.isYou ? 'bg-accent/[0.05] border border-accent/10' : 'bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      <span className="text-xs font-bold text-gray-400 w-4 tabular-nums">{m.pos}</span>
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-500">
                        {m.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-semibold ${m.isYou ? 'text-accent' : 'text-gray-900'}`}>{m.name}</p>
                        {m.isLast && <p className="text-[9px] text-gray-400">Paga las cañas</p>}
                      </div>
                      <span className="text-xs font-bold text-gray-500 tabular-nums">{m.pts.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Comparison bars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...SPRING, delay: 0.6 }}
            >
              <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
                <p className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-3">Puntos esta semana</p>
                <ComparisonBars members={[
                  { name: 'Carlos', pts: 340 },
                  { name: 'María', pts: 280 },
                  { name: 'Tú', pts: 250, isYou: true },
                  { name: 'David', pts: 120 },
                ]} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   INVITE CTA
   ================================================================ */

function InviteCTA() {
  return (
    <section id="join" className="py-24 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <FadeIn>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            ¿Listo para subir
            <br />
            <span className="text-accent">de nivel?</span>
          </h2>
          <p className="mt-6 text-lg text-muted max-w-lg mx-auto leading-relaxed">
            Solo se entra con invitación. Pídele un código a alguien que ya esté dentro.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a
            href="/access"
            className="inline-flex items-center gap-2 mt-10 px-10 py-4 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent-light transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Tengo una invitación <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4">
            <a href="/access?waitlist=1" className="text-xs text-gray-400 hover:text-muted transition">
              ¿No tienes? Entra en la lista de espera
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ================================================================
   FOOTER
   ================================================================ */

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <Logo size="sm" />
            <p className="text-xs text-muted mt-1">Sube de nivel.</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="/legal/privacidad" className="hover:text-foreground transition">Privacidad</a>
            <a href="/legal/terminos" className="hover:text-foreground transition">Términos</a>
            <a href="/legal/cookies" className="hover:text-foreground transition">Cookies</a>
          </div>
        </div>
        <p className="text-center text-[11px] text-muted mt-8">
          © 2026 NIVEL. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

/* ================================================================
   PAGE
   ================================================================ */

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <ActivityTicker />
      <AppShowcase />
      <Teams />
      <InviteCTA />
      <Footer />
    </main>
  )
}
