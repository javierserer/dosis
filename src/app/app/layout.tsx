'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const tabs = [
  { href: '/app', label: 'Inicio' },
  { href: '/app/habits', label: 'Hábitos' },
  { href: '/app/squad', label: 'Squad' },
  { href: '/app/recap', label: 'Progreso' },
  { href: '/app/profile', label: 'Perfil' },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <div className="pb-20 max-w-lg mx-auto">{children}</div>

      <nav className="fixed bottom-0 inset-x-0 bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/[0.06] z-50">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center justify-center py-2 px-3 rounded-lg transition-colors text-xs font-semibold ${
                  active ? 'text-gold' : 'text-neutral-600 hover:text-neutral-400'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  )
}
