import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/shared'

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="text-muted hover:text-foreground transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo size="sm" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Términos y Condiciones</h1>
        <p className="text-xs text-muted mb-8">Última actualización: 9 de abril de 2026</p>

        <div className="prose-nivel">
          <h2>1. Aceptación</h2>
          <p>Al crear una cuenta en NIVEL, aceptas estos términos y condiciones. Si no estás de acuerdo, no utilices la aplicación.</p>

          <h2>2. Descripción del servicio</h2>
          <p>NIVEL es una aplicación de seguimiento de hábitos que permite a los usuarios registrar hábitos diarios, ganar puntos, subir de nivel y competir con amigos en squads. El servicio se ofrece &quot;tal cual&quot; y puede cambiar o actualizarse en cualquier momento.</p>

          <h2>3. Registro y cuenta</h2>
          <ul>
            <li>Necesitas una invitación de un usuario existente para registrarte.</li>
            <li>Eres responsable de mantener la seguridad de tu cuenta.</li>
            <li>Debes proporcionar información veraz.</li>
            <li>Solo se permite una cuenta por persona.</li>
          </ul>

          <h2>4. Uso aceptable</h2>
          <p>Te comprometes a:</p>
          <ul>
            <li>No usar la app para actividades ilegales o dañinas.</li>
            <li>No intentar manipular el sistema de puntos o rankings.</li>
            <li>No acosar, insultar o intimidar a otros usuarios.</li>
            <li>No subir contenido ofensivo como foto de perfil.</li>
            <li>No intentar acceder a cuentas de otros usuarios.</li>
          </ul>

          <h2>5. Propiedad intelectual</h2>
          <p>NIVEL, su diseño, código, marca, logos y contenido son propiedad de NIVEL. No puedes copiar, modificar, distribuir ni crear trabajos derivados sin nuestro permiso.</p>

          <h2>6. Contenido del usuario</h2>
          <p>Eres propietario de los datos que introduces (nombres de hábitos, foto de perfil). Nos otorgas licencia para mostrar ese contenido dentro del servicio (por ejemplo, tu nombre y avatar en el ranking de tu squad).</p>

          <h2>7. Disponibilidad</h2>
          <p>No garantizamos que el servicio esté disponible de forma ininterrumpida. Podemos realizar mantenimientos, actualizaciones o interrupciones temporales sin previo aviso.</p>

          <h2>8. Limitación de responsabilidad</h2>
          <p>NIVEL no se hace responsable de daños directos, indirectos, incidentales o consecuentes derivados del uso de la app. El servicio se proporciona sin garantías de ningún tipo.</p>

          <h2>9. Suspensión y cancelación</h2>
          <ul>
            <li>Podemos suspender o eliminar cuentas que violen estos términos.</li>
            <li>Puedes eliminar tu cuenta en cualquier momento desde la configuración de tu perfil o contactándonos.</li>
          </ul>

          <h2>10. Modificaciones</h2>
          <p>Podemos actualizar estos términos. El uso continuado de la app tras los cambios implica tu aceptación.</p>

          <h2>11. Legislación aplicable</h2>
          <p>Estos términos se rigen por la legislación española y europea vigente.</p>

          <h2>12. Contacto</h2>
          <p>Para cualquier consulta: <strong>hola@nivel.app</strong>.</p>
        </div>
      </div>
    </main>
  )
}
