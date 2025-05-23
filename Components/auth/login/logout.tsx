'use client'
import { UserButton, useUser, SignInButton, SignUpButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function AuthButtons() {
  const { isSignedIn } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative">
      {/* Botón de menú hamburguesa para móvil */}
      <button
        onClick={toggleMenu}
        className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Contenido del menú */}
      <div className={`
        sm:flex sm:flex-row sm:items-center sm:gap-4
        ${isMenuOpen ? 'flex flex-col' : 'hidden'}
        absolute sm:relative top-full sm:top-auto right-0 sm:right-auto mt-2 sm:mt-0
        bg-white sm:bg-transparent shadow-lg sm:shadow-none
        rounded-lg sm:rounded-none border sm:border-none
        p-4 sm:p-0 w-48 sm:w-auto
        z-50
        transition-all duration-200 ease-in-out
      `}>
        {isSignedIn ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 border-blue-500 rounded-full shadow-lg',
                  userButtonPopoverCard: 'shadow-xl border border-gray-200', 
                  userButtonPopoverActionButton: 'text-blue-600 hover:bg-blue-100', 
                  userButtonPopoverActionButtonIcon: 'text-blue-600',
                  userButtonPopover: 'z-[100]',
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <SignInButton mode="modal">
              <button 
                className="w-full sm:w-auto text-center px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar sesión
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button 
                className="w-full sm:w-auto text-center px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Registrarse
              </button>
            </SignUpButton>
          </div>
        )}
      </div>

      {/* Overlay para móvil */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-500/10 backdrop-blur-[2px] sm:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  )
}