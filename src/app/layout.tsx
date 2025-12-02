import './globals.css'
import React from 'react'
import { AuthProvider } from './context/AuthContext'

export const metadata = {
  title: 'GitFest',
  description: 'Create a festival lineup from your top repositories.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-white dark:bg-zinc-900'>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
