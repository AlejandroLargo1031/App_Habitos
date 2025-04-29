import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignUp 
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            card: 'shadow-lg rounded-xl bg-white border border-gray-200',
            headerTitle: 'text-blue-500 font-bold text-2xl',
            primaryButton: 'bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg',
            secondaryButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg',
            footerActionLink: 'text-blue-500 hover:underline',
          },
          layout: {
            socialButtonsPlacement: 'bottom',
            logoPlacement: 'inside',
          },
          variables: {
            colorPrimary: '#2196F3',
            colorBackground: '#F3F4F6',
            colorText: '#374151',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '8px',
          }
        }}
      />
    </div>
  )
}