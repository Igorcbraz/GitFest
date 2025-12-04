import React from 'react'
import { ArrowDownIcon, StarIcon, ClockIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

type Filters = {
  theme: 'dark' | 'light' | 'gitfest-rio';
  invertColors: boolean;
  sort: 'stars' | 'created' | 'updated' | 'full_name';
  order: 'asc' | 'desc';
  type: string[];
};

export default function SortControls({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
  const sortOptions = [
    { value: 'stars', label: 'Stars', icon: StarIcon },
    { value: 'created', label: 'Created', icon: ClockIcon },
    { value: 'updated', label: 'Updated', icon: PencilSquareIcon },
    { value: 'full_name', label: 'Name', icon: DocumentTextIcon },
  ] as const

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-sm font-bold text-gray-900 dark:text-white mb-1'>Sort By</h3>
          <p className='text-xs text-gray-600 dark:text-gray-400'>
            {filters.order === 'asc' ? 'Ascending' : 'Descending'}
          </p>
        </div>
        <button
          className='group relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400 transition-all hover:scale-110 active:scale-95 overflow-hidden'
          onClick={() => setFilters((prev) => ({ ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' }))}
          aria-label='Toggle sort order'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          <ArrowDownIcon className={`relative z-10 w-4 h-4 transition-transform duration-500 ${filters.order === 'desc' ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {sortOptions.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            className={`group relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all overflow-hidden ${
              filters.sort === value
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-600 hover:scale-105'
            }`}
            onClick={() => setFilters((prev) => ({ ...prev, sort: value }))}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${filters.sort === value ? 'opacity-50' : ''}`}></div>
            <Icon className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ${filters.sort === value ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className='relative z-10'>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
