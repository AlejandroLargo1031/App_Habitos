// app/admin/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function AdminPage() {
  auth().then(({ sessionClaims }) => {
    // Verificar rol de admin (configura esto en Clerk Dashboard)
    if ((sessionClaims?.metadata as { role?: string })?.role !== 'admin') {
      redirect('/dashboard')
    }
  })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      {/* Contenido del admin */}
    </div>
  )
}