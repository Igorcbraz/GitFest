'use client'
import React, { useState, useEffect } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { ThemeToggle } from '../../ThemeToggle'

export const Desktop: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    window.addEventListener('scroll', handleScroll)
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <nav
      className='fixed z-50 top-0 left-0 right-0 flex justify-center'
      style={{
        transform: isScrolled ? 'translateY(1rem)' : 'translateY(0)',
        transition: 'transform 1.2s cubic-bezier(0.33, 1, 0.68, 1)'
      }}
    >
      <div
        className='w-full'
        style={{
          maxWidth: isScrolled ? '90rem' : '100%',
          minWidth: isScrolled ? '60rem' : 'auto',
          paddingLeft: isScrolled ? 'max(1.5rem, calc((100% - 90rem) / 2))' : '0',
          paddingRight: isScrolled ? 'max(1.5rem, calc((100% - 90rem) / 2))' : '0',
          transition: 'padding 1.2s cubic-bezier(0.33, 1, 0.68, 1), max-width 1.2s cubic-bezier(0.33, 1, 0.68, 1), min-width 1.2s cubic-bezier(0.33, 1, 0.68, 1)'
        }}
      >
        <div
          style={{
            borderRadius: isScrolled ? '1rem' : '0',
            backgroundColor: isScrolled
              ? (isDark ? 'rgba(24, 24, 27, 0.7)' : 'rgba(255, 255, 255, 0.7)')
              : (isDark ? 'rgba(24, 24, 27, 0.6)' : 'rgba(255, 255, 255, 0.6)'),
            backdropFilter: isScrolled ? 'blur(24px)' : 'blur(8px)',
            boxShadow: isScrolled
              ? '0 25px 50px -12px rgba(149, 117, 205, 0.15), 0 0 60px rgba(149, 117, 205, 0.08)'
              : 'none',
            borderWidth: isScrolled ? '1px' : '0',
            borderColor: isScrolled
              ? (isDark ? 'rgba(149, 117, 205, 0.3)' : 'rgba(149, 117, 205, 0.2)')
              : 'transparent',
            transition: 'border-radius 1.2s cubic-bezier(0.33, 1, 0.68, 1), background-color 1.2s cubic-bezier(0.33, 1, 0.68, 1), backdrop-filter 1.2s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 1.3s cubic-bezier(0.33, 1, 0.68, 1), border-width 1.2s cubic-bezier(0.33, 1, 0.68, 1), border-color 1.2s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          <div
            className='container'
            style={{
              paddingLeft: isScrolled ? '2rem' : undefined,
              paddingRight: isScrolled ? '2rem' : undefined,
              transition: 'padding 1.2s cubic-bezier(0.33, 1, 0.68, 1)'
            }}
          >
            <div className='flex items-center justify-between h-20'>
              {/*Logo */}
              <a href='/' className='flex items-center gap-3 group'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <span className='text-white font-bold text-xl'>G</span>
                </div>
                <h1 className='text-2xl font-bold'>
                  <span className='text-gray-900 dark:text-white'>Git</span>
                  <span className='text-gradient-primary'>Fest</span>
                </h1>
              </a>

              {/*Actions */}
              <div className='flex items-center gap-4'>
                <a
                  href='https://github.com/Igorcbraz/GitFest#readme'
                  target='_blank'
                  rel='noreferrer'
                  className='hidden md:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 font-medium transition-colors'
                >
                  <InformationCircleIcon className='w-5 h-5' />
                  <span>About</span>
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
