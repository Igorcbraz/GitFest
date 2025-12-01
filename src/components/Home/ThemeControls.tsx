import React from 'react';
import { MoonIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

type Filters = {
  theme: 'dark' | 'light';
  invertColors: boolean;
  sort: 'stars' | 'created' | 'updated' | 'full_name';
  order: 'asc' | 'desc';
  type: string[];
};

export default function ThemeControls({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
  return (
    <div className='flex justify-start items-start flex-col w-screen pr-4 h-fit md:w-fit'>
      <h2 className='text-2xl font-bold text-start text-gray-800 dark:text-gray-300'>Theme</h2>
      <p className='text-lg text-start text-gray-600 mt-2 dark:text-gray-500'>Theme the template should be</p>
      <div className='flex justify-start items-center flex-wrap gap-5 mt-5'>
        <button
          className={`group/dark flex justify-between items-center w-28 md:w-fit h-20 md:h-14 ${filters.theme === 'dark' ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => setFilters((prev) => ({ ...prev, theme: 'dark' }))}
        >
          Dark
          <MoonIcon className='w-6 h-6 ml-2 group-hover/dark:animate-pulse duration-150' />
        </button>
        <button
          className={`group/light flex justify-between items-center w-40 md:w-fit h-20 md:h-14 ${filters.theme === 'light' ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => setFilters((prev) => ({ ...prev, theme: 'light' }))}
          disabled
        >
          Light (Soon)
          <ArrowPathIcon className='w-6 h-6 ml-2' />
        </button>
        <button
          className={`group/invert flex justify-between items-center row-span-2 w-48 md:w-fit h-20 md:h-14 ${filters.invertColors ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => setFilters((prev) => ({ ...prev, invertColors: !prev.invertColors }))}
        >
          Invert Colors
          <ArrowPathIcon className={`w-6 h-6 ml-2 duration-500 transition-transform ${filters.invertColors ? '-rotate-180' : 'rotate-0'} transform group-hover/invert:-rotate-180`} />
        </button>
      </div>
    </div>
  );
}
