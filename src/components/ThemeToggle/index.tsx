'use client'
import React, { useContext, useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '../../app/context/AuthContext'

export const ThemeToggle: React.FC = () => {
  const auth = useContext(AuthContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!auth) return null
  const { state, dispatch } = auth

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    dispatch({ type: 'SET_THEME', payload: newTheme })
  }

  if (!mounted) {
    return (
      <button
        className='flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-all'
        aria-label='Toggle theme'
        disabled
      >
        <div className='w-5 h-5' />
      </button>
    )
  }

  return (
    <button
      className='flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-all'
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      {state.theme === 'dark' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
    </button>
  )
}
