'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/shared'
import { Lock, Phone, KeyRound, ArrowLeft, Flame, Check } from 'lucide-react'
import Link from 'next/link'

const SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 }

type Step = 'invite' | 'phone' | 'otp'

export default function AccessPage() {
  const [step, setStep] = useState<Step>('invite')
  const [inviteCode, setInviteCode] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [invitedBy, setInvitedBy] = useState('')
  const [isFounding, setIsFounding] = useState(false)

  const handleInviteCode = (e: React.FormEvent) => {
    e.preventDefault()
    const code = inviteCode.trim().toUpperCase()
    if (code.length < 6) {
      setError('Código inválido')
      return
    }
    setError('')
    if (code === 'FOUNDING') { setIsFounding(true); setInvitedBy('Equipo GRINTA') }
    else if (code === 'GRINTA1') setInvitedBy('Carlos M.')
    else if (code === 'INVITE') setInvitedBy('María L.')
    else setInvitedBy('Un miembro de GRINTA')
    setStep('phone')
  }

  const handlePhone = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 9) { setError('Número inválido'); return }
    setError('')
    setStep('otp')
  }

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) { setError('Código inválido'); return }
    window.location.href = '/app'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 relative bg-white">
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-muted hover:text-foreground transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      <div className="mb-8">
        <Logo size="lg" />
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {['invite', 'phone', 'otp'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition ${
              step === s ? 'bg-accent' : i < ['invite', 'phone', 'otp'].indexOf(step) ? 'bg-success' : 'bg-gray-200'
            }`} />
            {i < 2 && <div className={`w-6 h-px ${i < ['invite', 'phone', 'otp'].indexOf(step) ? 'bg-success' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-sm relative min-h-[280px]">
        <AnimatePresence mode="wait">
          {step === 'invite' && (
            <motion.form
              key="invite"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={SPRING}
              onSubmit={handleInviteCode}
              className="space-y-4"
            >
              <div className="text-center mb-2">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <p className="text-base font-semibold">¿Tienes código de invitación?</p>
                <p className="text-xs text-muted mt-1">Alguien de dentro tiene que invitarte</p>
              </div>

              <input
                type="text"
                value={inviteCode}
                onChange={(e) => { setInviteCode(e.target.value); setError('') }}
                placeholder="Pega tu código aquí"
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-center text-base font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:border-accent/40 transition uppercase"
                autoFocus
                autoComplete="off"
              />

              {error && <p className="text-xs text-red-500 text-center">{error}</p>}

              <motion.button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-sm transition"
                whileTap={{ scale: 0.97 }}
              >
                Verificar código
              </motion.button>
            </motion.form>
          )}

          {step === 'phone' && (
            <motion.form
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={SPRING}
              onSubmit={handlePhone}
              className="space-y-4"
            >
              <motion.div
                className="text-center mb-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...SPRING, delay: 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-success-bg border border-success/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-success" />
                </div>
                <p className="text-base font-semibold">Código válido</p>
                <p className="text-xs text-muted mt-1">Invitado por <span className="text-foreground font-medium">{invitedBy}</span></p>
                {isFounding && (
                  <motion.div
                    className="inline-flex items-center gap-1.5 mt-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...SPRING, delay: 0.3 }}
                  >
                    <Flame className="w-3 h-3 text-accent" />
                    <span className="text-[10px] text-accent font-bold">FOUNDING MEMBER</span>
                  </motion.div>
                )}
              </motion.div>

              <div className="flex gap-2">
                <div className="w-16 bg-surface border border-border rounded-xl px-2 py-3.5 text-center text-sm font-medium text-muted">
                  +34
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setError('') }}
                  placeholder="Tu teléfono"
                  className="flex-1 px-4 py-3.5 bg-surface border border-border rounded-xl text-base placeholder-gray-400 focus:outline-none focus:border-accent/40 transition"
                  autoFocus
                  autoComplete="tel"
                  enterKeyHint="send"
                />
              </div>

              {error && <p className="text-xs text-red-500 text-center">{error}</p>}

              <motion.button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-sm transition"
                whileTap={{ scale: 0.97 }}
              >
                Enviar código SMS
              </motion.button>

              <button type="button" onClick={() => setStep('invite')} className="w-full text-center text-xs text-muted hover:text-foreground transition">
                Cambiar código de invitación
              </button>
            </motion.form>
          )}

          {step === 'otp' && (
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={SPRING}
              onSubmit={handleOtp}
              className="space-y-4"
            >
              <div className="text-center mb-2">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm text-muted">Código enviado a</p>
                <p className="text-sm font-semibold">+34 {phone}</p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError('') }}
                placeholder="000000"
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-center text-2xl font-mono tracking-[0.4em] placeholder-gray-300 focus:outline-none focus:border-accent/40 transition"
                autoFocus
                autoComplete="one-time-code"
              />

              {error && <p className="text-xs text-red-500 text-center">{error}</p>}

              <motion.button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-sm transition"
                whileTap={{ scale: 0.97 }}
              >
                Entrar
              </motion.button>

              <button type="button" onClick={() => setStep('phone')} className="w-full text-center text-xs text-muted hover:text-foreground transition">
                Cambiar número
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-12 text-xs text-muted text-center">
        Solo puedes entrar con una invitación.{' '}
        <Link href="/" className="text-accent hover:underline">Volver</Link>
      </p>
    </main>
  )
}
