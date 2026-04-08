'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, type ReactNode } from 'react'

export const SPRING = { type: 'spring' as const, stiffness: 80, damping: 18 }
export const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 200, damping: 22 }

export function Coin({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 font-bold text-black shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.55 }}
    >
      D
    </span>
  )
}

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const cls = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' }[size]
  return (
    <span className={`${cls} font-extrabold tracking-tighter`}>
      <span className="text-gold">D</span>OSIS
    </span>
  )
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const offsets = { up: [30, 0], down: [-30, 0], left: [0, -40], right: [0, 40] }
  const [y, x] = offsets[direction]
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (inView) motionVal.set(target)
  }, [inView, target, motionVal])

  useEffect(() => {
    const unsub = springVal.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v).toLocaleString('es-ES')}${suffix}`
    })
    return unsub
  }, [springVal, prefix, suffix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
