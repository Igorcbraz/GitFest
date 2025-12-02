import React from 'react'
import { ThemeToggle } from '../../components/ThemeToggle'
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function HeaderBar({ username, bio, onLogout }: { username: string; bio?: string | null; onLogout: () => void }) {
  return (
    <header className='sticky top-0 z-40 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border-b border-gray-200/50 dark:border-zinc-800/50 animate-fade-in-down shadow-sm'>
      <div className='container max-w-7xl'>
        <div className='flex justify-between items-center h-18 gap-6 py-3'>
          <div className='flex items-center gap-4 flex-1 min-w-0 group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500'></div>
              <div className='relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'>
                <UserCircleIcon className='w-7 h-7 text-white' />
              </div>
            </div>
            <div className='min-w-0 flex-1'>
              <h1 className='text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300'>
                {username}
              </h1>
              {bio && (
                <p className='text-sm text-gray-600 dark:text-gray-400 truncate leading-tight'>
                  {bio}
                </p>
              )}
            </div>
          </div>
          <div className='flex items-center gap-3 flex-shrink-0'>
            <ThemeToggle />
            <button
              className='group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 font-semibold transition-all text-sm hover:scale-105 hover:shadow-lg active:scale-95'
              onClick={onLogout}
            >
              <span className='hidden sm:inline'>Logout</span>
              <ArrowLeftOnRectangleIcon className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

