'use client'
import { UserButton, useUser } from '@clerk/nextjs'

export function AuthButtons() {
  const { isSignedIn } = useUser()

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-16 h-16 md:w-20 md:h-20 border-2 border-blue-500 rounded-full shadow-lg',
                userButtonPopoverCard: 'shadow-xl border border-gray-200', 
                userButtonPopoverActionButton: 'text-blue-600 hover:bg-blue-100', 
                userButtonPopoverActionButtonIcon: 'text-blue-600',
              },
            }}
          />
        </>
      ) : (
        <>
          <a 
            href="/sign-in" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </a>
          <a 
            href="/sign-up" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Registrarse
          </a>
        </>
      )}
    </div>
  )
}