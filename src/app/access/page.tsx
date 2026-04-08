'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/shared'

const SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 }

export default function AccessPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length < 9) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setStep('otp')
  }

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    router.push('/app')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 relative bg-background">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-gold/[0.06] to-transparent blur-3xl pointer-events-none" />

      {/* Logo */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        <Logo size="lg" />
        <p className="text-sm text-neutral-500 mt-2">Gánate tus vicios</p>
      </motion.div>

      {/* Form */}
      <div className="w-full max-w-sm relative">
        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.form
              key="phone"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={SPRING}
              onSubmit={handleSendOtp}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-neutral-400 mb-2 font-medium">Tu número de teléfono</label>
                <div className="flex gap-2">
                  <div className="px-3.5 py-3 bg-card border border-border rounded-xl text-sm text-neutral-400 flex items-center">
                    +34
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    autoFocus
                    placeholder="612 345 678"
                    className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition text-base"
                    maxLength={9}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading || phone.length < 9}
                className="w-full py-3.5 rounded-xl bg-gold text-black font-bold text-base disabled:opacity-30 transition"
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    />
                    Enviando...
                  </span>
                ) : (
                  'Continuar'
                )}
              </motion.button>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-neutral-600">o</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-xl border border-border text-sm text-neutral-400 hover:text-white hover:border-white/20 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar con Google
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={SPRING}
              onSubmit={handleVerify}
              className="space-y-4"
            >
              <div className="text-center mb-2">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl mx-auto mb-3">
                  📱
                </div>
                <p className="text-sm text-neutral-400">Código enviado a</p>
                <p className="text-sm text-white font-semibold">+34 {phone}</p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                autoFocus
                placeholder="000000"
                className="w-full text-center text-3xl tracking-[0.4em] font-mono px-4 py-4 bg-card border border-border rounded-xl text-white placeholder-neutral-700 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition"
              />

              <motion.button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-3.5 rounded-xl bg-gold text-black font-bold text-base disabled:opacity-30 transition"
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    />
                    Verificando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </motion.button>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => { setStep('phone'); setOtp('') }}
                  className="text-neutral-500 hover:text-white transition"
                >
                  ← Cambiar número
                </button>
                <button type="button" className="text-gold hover:text-gold-light transition">
                  Reenviar código
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom legal */}
      <p className="absolute bottom-6 text-[11px] text-neutral-700 text-center px-8">
        Al continuar aceptas los{' '}
        <a href="#" className="underline hover:text-neutral-500">términos</a> y la{' '}
        <a href="#" className="underline hover:text-neutral-500">política de privacidad</a>.
      </p>
    </main>
  )
}
