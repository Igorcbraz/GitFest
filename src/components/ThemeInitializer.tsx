'use client'
import { useTheme } from '../hooks/useTheme'
import { useEffect } from 'react'

export function ThemeInitializer() {
  const [theme] = useTheme()
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [theme])
  return null
}
