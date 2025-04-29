import { auth } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Sidebar } from './components/Sidebar'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  if (!user) return <div>Not signed in</div>

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8 pt-20">
        <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {user?.firstName}</h1>
        <p className="text-gray-600 mt-2">Selecciona una opción del menú para comenzar.</p>
      </main>
    </div>
  )
}