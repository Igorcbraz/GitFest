import React from 'react'
import { MoonIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

type Filters = {
  theme: 'dark' | 'light';
  invertColors: boolean;
  sort: 'stars' | 'created' | 'updated' | 'full_name';
  order: 'asc' | 'desc';
  type: string[];
};

export default function ThemeControls({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
  return (
    <div className='space-y-3'>
      <div>
        <h3 className='text-sm font-bold text-gray-900 dark:text-white mb-1'>Theme</h3>
        <p className='text-xs text-gray-600 dark:text-gray-400'>Choose your lineup style</p>
      </div>
      <div className='space-y-2'>
        <button
          className={`group relative w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold text-sm transition-all overflow-hidden ${
            filters.theme === 'dark'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-600 hover:scale-105'
          }`}
          onClick={() => setFilters((prev) => ({ ...prev, theme: 'dark' }))}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${filters.theme === 'dark' ? 'opacity-50' : ''}`}></div>
          <span className='relative z-10'>Dark</span>
          <MoonIcon className={`relative z-10 w-4 h-4 transition-transform duration-300 ${filters.theme === 'dark' ? 'rotate-12' : 'group-hover:rotate-12'}`} />
        </button>
        <button
          className='relative w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-sm bg-gray-50 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 cursor-not-allowed overflow-hidden'
          disabled
        >
          <span>Light</span>
          <ArrowPathIcon className='w-4 h-4' />
          <div className='absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-100/50 dark:from-zinc-700/50 dark:to-zinc-800/50'></div>
        </button>
        <div className='pt-1'>
          <label className='group relative flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer transition-all hover:scale-105 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            <span className='relative z-10 text-sm font-semibold text-gray-700 dark:text-gray-300'>Invert Colors</span>
            <input
              type='checkbox'
              checked={filters.invertColors}
              onChange={() => setFilters((prev) => ({ ...prev, invertColors: !prev.invertColors }))}
              className='relative z-10 w-11 h-6 appearance-none bg-gray-300 dark:bg-zinc-600 rounded-full cursor-pointer transition-all checked:bg-gradient-to-r checked:from-primary-500 checked:to-secondary-500 shadow-inner after:content-[""] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all after:shadow-md checked:after:translate-x-5 hover:shadow-lg'
            />
          </label>
        </div>
      </div>
    </div>
  )
}
