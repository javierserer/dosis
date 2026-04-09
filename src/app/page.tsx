'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeIn, CountUp, Logo, Pts, SPRING, SPRING_SNAPPY } from '@/components/shared'
import {
  Flame, Heart, Target, Users, BarChart3, Trophy, Plus,
  ChevronRight, Check, ArrowRight, Zap, TrendingUp,
} from 'lucide-react'

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
          <a href="#squads" className="hidden sm:block text-sm text-muted hover:text-foreground transition">
            Squads
          </a>
          <a
            href="#join"
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

  const feedItems = [
    { name: 'Carlos', action: 'Gym 1h', pts: 50, kudos: 8, time: 'Hace 12min' },
    { name: 'María', action: 'Leer 30min', pts: 30, kudos: 5, time: 'Hace 45min' },
    { name: 'Tú', action: 'Madrugar 6:30', pts: 50, kudos: 12, time: 'Hace 2h', isYou: true },
  ]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16">
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
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
            Cada hábito
            <br />
            <span className="text-accent">cuenta.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: 0.35 }}
          >
            Trackea tus hábitos, gana puntos, comparte tu progreso con tu squad.
            <br className="hidden sm:block" />{' '}
            <span className="text-foreground font-medium">Como Strava, pero para todo lo que te hace mejor.</span>
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
            className="mt-8 flex items-center gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
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
          </motion.div>
        </div>

        {/* Phone mockup with activity feed */}
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ ...SPRING, delay: 0.3 }}
        >
          <PhoneFrame>
            <div className="pt-10 px-4 pb-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-extrabold tracking-tight text-gray-900">
                  <span className="text-accent">G</span>RINTA
                </span>
                <div className="flex items-center gap-1.5 text-xs text-accent font-bold">
                  <Flame className="w-3.5 h-3.5" /> 14d
                </div>
              </div>

              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Feed</p>
              <div className="space-y-2.5 flex-1">
                {feedItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className={`rounded-xl p-3 ${item.isYou ? 'bg-accent/[0.06] border border-accent/15' : 'bg-gray-50'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ ...SPRING, delay: 0.7 + i * 0.12 }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">
                        {item.name[0]}
                      </div>
                      <span className="text-xs font-semibold text-gray-900">{item.name}</span>
                      <span className="text-[10px] text-gray-400 ml-auto">{item.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-accent" />
                        <span className="text-xs text-gray-700">{item.action}</span>
                        <span className="text-[10px] text-accent font-bold">+{item.pts}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Heart className="w-3 h-3" />
                        <span className="text-[10px]">{item.kudos}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-3 bg-gray-50 rounded-xl p-3 text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.3 }}
              >
                <p className="text-[10px] text-gray-400">Tu saldo</p>
                <p className="text-xl font-extrabold text-gray-900">850 <span className="text-xs text-gray-400 font-normal">pts</span></p>
              </motion.div>
            </div>
          </PhoneFrame>

          {/* Floating badge */}
          <motion.div
            className="absolute -right-6 top-28 bg-white border border-border rounded-xl p-3 shadow-lg w-44"
            initial={{ opacity: 0, x: 20, scale: 0.85 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ ...SPRING, delay: 1.4 }}
          >
            <motion.div
              animate={inView ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
                <span className="text-[10px] text-accent font-semibold">12 kudos</span>
              </div>
              <p className="text-xs text-gray-700">Tu squad celebra tu racha</p>
            </motion.div>
          </motion.div>

          {/* Streak badge */}
          <motion.div
            className="absolute -left-4 bottom-28 bg-white border border-border rounded-xl p-3 shadow-lg"
            initial={{ opacity: 0, x: -20, scale: 0.85 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ ...SPRING, delay: 1.6 }}
          >
            <motion.div
              animate={inView ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] text-accent font-semibold">14 días</span>
              </div>
              <p className="text-xs text-gray-700 mt-0.5">Racha x2 activa</p>
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
    'María desbloqueó "Monje" — 30 días sin alcohol',
    'David recibió 8 kudos por su racha',
    'Laura retó a Pablo · Running semanal',
    'Ana lleva 30 días de racha · x4 multiplicador',
    'Los Disciplinados: top 5% global esta semana',
    '12 personas entraron esta semana por invitación',
    'Javier completó todos sus hábitos hoy',
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
   HOW IT WORKS
   ================================================================ */

function HowItWorks() {
  const steps = [
    { icon: Target, title: 'Define tus hábitos', desc: 'Los que quieras: gym, lectura, meditación, skincare, no-fap... lo que sea tuyo. Tú eliges la dificultad y los puntos.' },
    { icon: Flame, title: 'Gana puntos', desc: 'Cumple y acumula. Las rachas multiplican. 7 días seguidos = puntos dobles. Tu squad recibe cada actividad.' },
    { icon: Heart, title: 'Recibe kudos', desc: 'Tu squad ve tu progreso y te da kudos. Compite en el ranking, reta a amigos, y gasta tus puntos en lo que quieras.' },
  ]

  return (
    <section id="como-funciona" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-16">
          <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Así funciona</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Tres pasos. Cero excusas.
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.15}>
              <motion.div
                className="relative bg-white rounded-2xl p-6 border border-border shadow-sm h-full"
                whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(252,82,0,0.1)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   ECONOMY
   ================================================================ */

function Economy() {
  const earnings = [
    { name: 'Gym 1h', pts: 50 },
    { name: 'Leer 30min', pts: 30 },
    { name: 'Madrugar antes de las 7', pts: 50 },
    { name: 'Sin alcohol hoy', pts: 30 },
    { name: 'Meditar 10min', pts: 15 },
    { name: 'Lo que tú quieras', pts: '??' },
  ]

  const rewards = [
    { name: 'Cerveza', pts: 100 },
    { name: 'Cheat meal', pts: 150 },
    { name: 'Netflix binge', pts: 80 },
    { name: 'Dormir hasta tarde', pts: 60 },
    { name: 'Tu vicio favorito', pts: '??' },
  ]

  return (
    <section className="py-24 sm:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-16">
          <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Tu economía</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Gana con disciplina.
            <br />
            <span className="text-muted">Gasta en lo que quieras.</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-success" />
                <h3 className="font-bold text-base">Ganas</h3>
              </div>
              <div className="space-y-3">
                {earnings.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-muted">{item.name}</span>
                    <span className="text-sm font-bold text-accent tabular-nums">+{item.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Zap className="w-4 h-4 text-muted" />
                <h3 className="font-bold text-base">Gastas</h3>
              </div>
              <div className="space-y-3">
                {rewards.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-muted">{item.name}</span>
                    <span className="text-sm font-bold text-gray-400 tabular-nums">−{item.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full border border-border px-5 py-3 shadow-sm">
            <span className="text-sm text-muted">La matemática es simple:</span>
            <span className="text-sm font-bold">
              <span className="text-accent">3 gym</span>
              {' = '}
              <span className="text-foreground">1 cerveza + 1 cheat meal</span>
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ================================================================
   FEED PREVIEW
   ================================================================ */

function FeedPreview() {
  const activities = [
    { name: 'Carlos M.', initials: 'CM', action: 'Gym 1h', pts: 50, kudos: 12, time: 'Hace 12 min', streak: 21 },
    { name: 'María L.', initials: 'ML', action: 'Meditación 15min', pts: 30, kudos: 8, time: 'Hace 45 min' },
    { name: 'Javier S.', initials: 'JS', action: 'Mascarilla pelo', pts: 15, kudos: 3, time: 'Hace 1h', isYou: true },
    { name: 'David R.', initials: 'DR', action: 'Leer 30min', pts: 30, kudos: 5, time: 'Hace 2h' },
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Activity feed</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                Ve lo que hace
                <br />
                tu squad.
                <br />
                <span className="text-muted">Dale kudos.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-md mx-auto lg:mx-0">
                Cada hábito completado aparece en el feed. Tu equipo te ve, te celebra, te motiva.
                <span className="text-foreground font-medium"> Como Strava, pero para la vida real.</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
                {[
                  { icon: Heart, text: 'Kudos con un tap', detail: 'Celebra cada logro de tu equipo' },
                  { icon: Users, text: 'Feed de tu squad', detail: 'Ve el progreso de todos en tiempo real' },
                  { icon: Flame, text: 'Rachas visibles', detail: 'Las rachas largas inspiran al grupo' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{f.text}</p>
                      <p className="text-xs text-muted">{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Feed mockup */}
          <FadeIn delay={0.2} className="shrink-0">
            <div className="w-[320px] bg-white rounded-2xl border border-border shadow-lg p-4 space-y-3">
              {activities.map((a, i) => (
                <div key={i} className={`rounded-xl p-3.5 ${a.isYou ? 'bg-accent/[0.05] border border-accent/10' : 'bg-surface'}`}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                      {a.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-gray-900">{a.name}</span>
                        {a.streak && (
                          <span className="text-[10px] text-accent font-bold flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5" /> {a.streak}d
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{a.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-success" />
                      <span className="text-sm text-gray-800 font-medium">{a.action}</span>
                      <span className="text-xs text-accent font-bold">+{a.pts}</span>
                    </div>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-accent transition">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-medium">{a.kudos}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   SQUADS
   ================================================================ */

function Squads() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const members = [
    { pos: 1, name: 'Carlos', pts: 1240, change: 0 },
    { pos: 2, name: 'María', pts: 980, change: 1 },
    { pos: 3, name: 'Tú', pts: 850, change: -1, isYou: true },
    { pos: 4, name: 'David', pts: 320, change: 0, isLast: true },
  ]

  return (
    <section id="squads" className="py-24 sm:py-32 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Squads</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                Tu equipo
                <br />
                te mantiene
                <br />
                <span className="text-muted">en marcha.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-md mx-auto lg:mx-0">
                Crea un squad con tus amigos. Compite cada semana. Daos kudos.
                <span className="text-foreground font-medium"> El último invita a las cañas.</span>
              </p>
            </FadeIn>

            <div className="mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Trophy, text: 'Ranking semanal', detail: 'Compite por el primer puesto cada semana' },
                { icon: Users, text: 'Duelos 1v1', detail: 'Reta a cualquiera. El perdedor paga.' },
                { icon: BarChart3, text: 'Progreso compartido', detail: 'Ve las stats de todo tu squad' },
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

          {/* Leaderboard mockup */}
          <motion.div
            className="shrink-0 w-[300px]"
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
                      m.isYou ? 'bg-accent/[0.05] border border-accent/10' : m.isLast ? 'bg-gray-50' : 'bg-gray-50'
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
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   PROGRESS
   ================================================================ */

function Progress() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Tu progreso</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                Los números
                <br />
                <span className="text-muted">no mienten.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-md mx-auto lg:mx-0">
                Resumen semanal automático. Tendencias, rachas, puntos.
                <span className="text-foreground font-medium"> Tu training log personal.</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
                {[
                  { icon: BarChart3, text: 'Resumen semanal', detail: 'Progreso de cada hábito, tendencias y rachas' },
                  { icon: TrendingUp, text: 'Tendencias', detail: 'Compara semana a semana, ve tu evolución' },
                  { icon: Trophy, text: 'Personal records', detail: 'Mejor racha, mejor semana, más puntos en un día' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{f.text}</p>
                      <p className="text-xs text-muted">{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Stats mockup */}
          <FadeIn delay={0.2} className="shrink-0">
            <div className="w-[300px] bg-white rounded-2xl border border-border shadow-lg p-5">
              <p className="text-xs font-bold text-gray-900 mb-1">Semana 14</p>
              <p className="text-[10px] text-gray-400 mb-4">vs semana anterior: <span className="text-accent font-bold">+12%</span></p>

              <div className="space-y-3 mb-4">
                {[
                  { name: 'Gym', done: 5, total: 5 },
                  { name: 'Lectura', done: 4, total: 7 },
                  { name: 'Sin alcohol', done: 6, total: 7 },
                  { name: 'Meditación', done: 3, total: 5 },
                ].map((h, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-500">{h.name}</span>
                      <span className={`font-bold ${h.done === h.total ? 'text-accent' : 'text-gray-700'}`}>
                        {h.done}/{h.total}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${h.done === h.total ? 'bg-accent' : 'bg-accent/40'}`}
                        style={{ width: `${(h.done / h.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Puntos', value: '+420' },
                  { label: 'Racha', value: '14d' },
                  { label: 'Squad', value: '#3' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <p className="text-base font-extrabold text-gray-900">{s.value}</p>
                    <p className="text-[9px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   INVITE SYSTEM
   ================================================================ */

function InviteSystem() {
  const tiers = [
    { count: '500', label: 'Founding Members', invites: 10, border: 'border-accent/30' },
    { count: '2.500', label: 'Nivel 2', invites: 5, border: 'border-border' },
    { count: '12.500', label: 'Nivel 3', invites: 5, border: 'border-border' },
  ]

  return (
    <section className="py-24 sm:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-16">
          <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Solo por invitación</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Cada invitación es un privilegio.
            <br />
            <span className="text-muted">No un enlace genérico.</span>
          </h2>
        </FadeIn>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
            {tiers.map((tier, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.15} className="relative">
                <div className={`bg-white border ${tier.border} rounded-2xl p-4 text-center w-36 sm:w-44 shadow-sm`}>
                  <p className="text-xl font-extrabold">{tier.count}</p>
                  <p className="text-[10px] text-muted font-semibold uppercase tracking-wider">{tier.label}</p>
                  <p className="text-[10px] text-accent font-bold mt-1">{tier.invites} invitaciones</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.4}>
          <div className="bg-white border border-border rounded-2xl p-6 max-w-2xl mx-auto shadow-sm">
            <h3 className="text-base font-bold mb-4 text-center">Gana más invitaciones</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { action: 'Racha de 30 días', reward: '+2 invitaciones' },
                { action: 'Ganar 3 duelos', reward: '+1 invitación' },
                { action: 'Squad en top 10%', reward: '+1 para todos' },
              ].map((item, i) => (
                <div key={i} className="text-center bg-surface rounded-xl p-3">
                  <p className="text-xs font-medium">{item.action}</p>
                  <p className="text-[10px] text-accent font-bold mt-0.5">{item.reward}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ================================================================
   WHY IT WORKS
   ================================================================ */

function WhyItWorks() {
  const reasons = [
    { title: 'Los kudos son adictivos', desc: 'Ver a tu equipo celebrar tu esfuerzo genera un loop que te mantiene volviendo.' },
    { title: 'La competición sana motiva', desc: 'Ver a Carlos por encima tuyo en el ranking. Eso es lo que te saca del sofá.' },
    { title: 'Los vicios son tu zanahoria', desc: 'No madrugas por "salud". Madrugas porque quieres esa cerveza del viernes.' },
    { title: '5 invitaciones. Ni una más.', desc: 'Cada persona solo tiene 5. Eso convierte cada invitación en algo valioso.' },
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-16">
          <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-3">Por qué funciona</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            La ciencia de la disciplina,
            <br />
            <span className="text-muted">gamificada.</span>
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                className="bg-white rounded-2xl border border-border shadow-sm p-6 h-full"
                whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <h3 className="text-base font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{r.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   NUMBERS
   ================================================================ */

function Numbers() {
  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="max-w-4xl mx-auto px-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: 4847, label: 'Personas dentro', suffix: '' },
            { value: 5, label: 'Invitaciones por persona', suffix: '' },
            { value: 87, label: 'Usan 3+ invites', suffix: '%' },
            { value: 14, label: 'Días racha media', suffix: '' },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="text-3xl sm:text-4xl font-extrabold">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </FadeIn>
          ))}
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-muted font-semibold mb-6">
            Solo por invitación
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            ¿Tienes lo que hay que tener?
          </h2>
          <p className="mt-6 text-lg text-muted max-w-lg mx-auto leading-relaxed">
            Cada persona dentro tiene <span className="text-foreground font-semibold">5 invitaciones</span>. Solo 5.
            <br />
            Si alguien cree que encajas, te dará una.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a
            href="/access"
            className="inline-flex items-center gap-2 mt-10 px-10 py-4 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent-light transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Tengo una invitación <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-muted">
            ¿No tienes? Consigue que alguien te invite.
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
            <p className="text-xs text-muted mt-1">Cada hábito cuenta.</p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { name: 'Twitter', label: '𝕏' },
              { name: 'Instagram', label: 'IG' },
              { name: 'TikTok', label: 'TT' },
            ].map((s) => (
              <a
                key={s.name}
                href="#"
                className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-bold text-muted hover:text-accent hover:border-accent/20 transition"
                aria-label={s.name}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-[11px] text-muted mt-8">
          © 2026 GRINTA. Todos los derechos reservados.
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
      <HowItWorks />
      <Economy />
      <FeedPreview />
      <Squads />
      <Progress />
      <InviteSystem />
      <WhyItWorks />
      <Numbers />
      <InviteCTA />
      <Footer />
    </main>
  )
}
