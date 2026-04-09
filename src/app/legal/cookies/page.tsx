import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/shared'

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="text-muted hover:text-foreground transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo size="sm" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Política de Cookies</h1>
        <p className="text-xs text-muted mb-8">Última actualización: 9 de abril de 2026</p>

        <div className="prose-nivel">
          <h2>1. ¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas una web o utilizas una aplicación. Permiten recordar tus preferencias y mantener tu sesión activa.</p>

          <h2>2. Cookies que utilizamos</h2>

          <h3>Cookies estrictamente necesarias</h3>
          <p>Son esenciales para el funcionamiento de la app. Sin ellas no puedes iniciar sesión ni navegar de forma segura.</p>
          <ul>
            <li><strong>sb-*-auth-token:</strong> Token de autenticación de Supabase. Mantiene tu sesión activa. Expira al cerrar sesión o según la configuración del servidor.</li>
          </ul>

          <h3>Cookies de rendimiento</h3>
          <ul>
            <li><strong>Vercel Analytics:</strong> Recopila datos de rendimiento web anonimizados (Web Vitals). No utiliza cookies persistentes ni rastrea usuarios individuales.</li>
          </ul>

          <h2>3. Cookies de terceros</h2>
          <p>NIVEL no utiliza cookies de publicidad ni de seguimiento de terceros. No hay rastreadores de redes sociales, Google Analytics ni píxeles de seguimiento.</p>

          <h2>4. Gestión de cookies</h2>
          <p>Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que si bloqueas las cookies de autenticación, no podrás usar la app.</p>
          <ul>
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
            <li><strong>Firefox:</strong> Ajustes → Privacidad y seguridad → Cookies</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
          </ul>

          <h2>5. Actualizaciones</h2>
          <p>Esta política puede actualizarse si incorporamos nuevas funcionalidades. Te informaremos de cambios significativos.</p>

          <h2>6. Contacto</h2>
          <p>Si tienes dudas: <strong>hola@nivel.app</strong>.</p>
        </div>
      </div>
    </main>
  )
}
