import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/shared'

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="text-muted hover:text-foreground transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo size="sm" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-xs text-muted mb-8">Última actualización: 9 de abril de 2026</p>

        <div className="prose-nivel">
          <h2>1. Responsable del tratamiento</h2>
          <p>NIVEL (&quot;nosotros&quot;, &quot;la app&quot;) es responsable del tratamiento de los datos personales recogidos a través de esta aplicación.</p>

          <h2>2. Datos que recopilamos</h2>
          <ul>
            <li><strong>Datos de registro:</strong> email, nombre de usuario y nombre para mostrar.</li>
            <li><strong>Foto de perfil:</strong> si decides subirla voluntariamente.</li>
            <li><strong>Datos de uso:</strong> hábitos creados, registros de cumplimiento, puntos, racha, nivel, actividad en squads.</li>
            <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador, dispositivo, sistema operativo, páginas visitadas.</li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <ul>
            <li>Proporcionar y mantener el servicio.</li>
            <li>Gestionar tu cuenta y autenticación.</li>
            <li>Mostrar tu progreso, estadísticas y rankings dentro de tu squad.</li>
            <li>Enviar notificaciones push si las has activado.</li>
            <li>Mejorar la app mediante análisis de uso agregado.</li>
          </ul>

          <h2>4. Base legal</h2>
          <p>Tratamos tus datos en base a: tu consentimiento al crear la cuenta, la ejecución del servicio que solicitas, y nuestro interés legítimo en mejorar la plataforma.</p>

          <h2>5. Compartición de datos</h2>
          <p>No vendemos ni compartimos tus datos personales con terceros, salvo:</p>
          <ul>
            <li><strong>Supabase:</strong> almacenamiento de datos y autenticación (servidores en la UE).</li>
            <li><strong>Vercel:</strong> hosting y entrega de la aplicación.</li>
            <li><strong>Vercel Analytics:</strong> métricas de rendimiento web anonimizadas.</li>
          </ul>

          <h2>6. Retención de datos</h2>
          <p>Conservamos tus datos mientras mantengas tu cuenta activa. Si solicitas la eliminación, borraremos todos tus datos en un plazo máximo de 30 días.</p>

          <h2>7. Tus derechos</h2>
          <p>Tienes derecho a acceder, rectificar, eliminar, portar y oponerte al tratamiento de tus datos. Puedes ejercerlos contactándonos por email.</p>

          <h2>8. Seguridad</h2>
          <p>Aplicamos medidas técnicas y organizativas para proteger tus datos, incluyendo cifrado en tránsito (HTTPS), control de acceso por filas en base de datos (RLS) y autenticación segura.</p>

          <h2>9. Cambios</h2>
          <p>Nos reservamos el derecho de actualizar esta política. Te notificaremos de cambios relevantes.</p>

          <h2>10. Contacto</h2>
          <p>Para cualquier cuestión relacionada con tu privacidad, escríbenos a <strong>hola@nivel.app</strong>.</p>
        </div>
      </div>
    </main>
  )
}
