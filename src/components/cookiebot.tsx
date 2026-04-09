'use client'

import { useEffect } from 'react'

const COOKIEBOT_ID = '43e2b056-31dc-4c65-b489-71709873b956'

export function CookiebotConsent() {
  useEffect(() => {
    if (!COOKIEBOT_ID) return
    if (document.getElementById('Cookiebot')) return

    const cb = document.createElement('script')
    cb.id = 'Cookiebot'
    cb.src = 'https://consent.cookiebot.com/uc.js'
    cb.setAttribute('data-cbid', COOKIEBOT_ID)
    cb.setAttribute('data-blockingmode', 'auto')
    cb.type = 'text/javascript'
    cb.async = true
    document.head.appendChild(cb)
  }, [])

  return null
}

export function CookieDeclaration() {
  useEffect(() => {
    if (!COOKIEBOT_ID) return
    const container = document.getElementById('CookieDeclarationContainer')
    if (!container) return

    const existing = document.getElementById('CookieDeclaration')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'CookieDeclaration'
    script.src = `https://consent.cookiebot.com/${COOKIEBOT_ID}/cd.js`
    script.type = 'text/javascript'
    script.async = true
    container.appendChild(script)

    return () => {
      document.getElementById('CookieDeclaration')?.remove()
    }
  }, [])

  return <div id="CookieDeclarationContainer" />
}
