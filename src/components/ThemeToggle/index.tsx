'use client'
import React from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../hooks/useTheme'

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) {
    return (
      <button
        className='flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 transition-all'
        aria-label='Toggle theme'
        disabled
      >
        <div className='w-5 h-5' />
      </button>
    )
  }
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  return (
    <button
      className='flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-all'
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
    </button>
  )
}
