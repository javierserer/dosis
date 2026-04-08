'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const tabs = [
  { href: '/app', label: 'Inicio', icon: '🏠', activeIcon: '🏠' },
  { href: '/app/habits', label: 'Hábitos', icon: '⚡', activeIcon: '⚡' },
  { href: '/app/squad', label: 'Squad', icon: '👥', activeIcon: '👥' },
  { href: '/app/recap', label: 'Recap', icon: '📊', activeIcon: '📊' },
  { href: '/app/profile', label: 'Perfil', icon: '👤', activeIcon: '👤' },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <div className="pb-20 max-w-lg mx-auto">{children}</div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/[0.06] z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-colors ${
                  active ? 'text-gold' : 'text-neutral-600 hover:text-neutral-400'
                }`}
              >
                <span className="text-[22px] leading-none">{active ? tab.activeIcon : tab.icon}</span>
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </Link>
            )
          })}
        </div>
        {/* Safe area for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  )
}
