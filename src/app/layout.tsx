import './globals.css'
import React from 'react'
import { AuthProvider } from '../context/AuthContext'
import { ReactQueryProvider } from '../providers/ReactQueryProvider'
import 'react-toastify/dist/ReactToastify.css'
import { ToastProvider } from '../providers/ToastProvider'
import { ThemeInitializer } from '../components/ThemeInitializer'

export const metadata = {
  title: 'GitFest',
  description: 'Create a festival lineup from your top repositories.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-white dark:bg-zinc-900'>
        <ThemeInitializer />
        <ReactQueryProvider>
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
