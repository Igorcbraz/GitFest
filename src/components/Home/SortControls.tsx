import React from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { StarIcon, ClockIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

type Filters = {
  theme: 'dark' | 'light';
  invertColors: boolean;
  sort: 'stars' | 'created' | 'updated' | 'full_name';
  order: 'asc' | 'desc';
  type: string[];
};

export default function SortControls({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
  return (
    <div className='flex justify-start items-start flex-col w-screen pr-4 h-fit md:w-fit'>
      <div className='flex flex-row justify-between items-center flex-wrap w-full'>
        <span>
          <h2 className='text-2xl font-bold text-start text-gray-800 dark:text-gray-300'>
            Sort ({filters.order === 'asc' ? 'Ascending' : 'Descending'})
          </h2>
          <p className='text-lg text-start text-gray-600 mt-2 dark:text-gray-500'>The property to sort the results by.</p>
        </span>
        <button
          className='text-primary-300 mr-5'
          onClick={() => setFilters((prev) => ({ ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' }))}
        >
          <ArrowDownIcon className={`w-6 h-6 ml-2 duration-500 transition-transform ${filters.order === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
        </button>
      </div>
      <div className='flex justify-start items-center flex-wrap gap-5 mt-5'>
        <button
          className={`group/stars flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'stars' ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => setFilters((prev) => ({ ...prev, sort: 'stars' }))}
        >
          Stars
          <StarIcon className='w-6 h-6 ml-2 duration-500 transition-transform' />
        </button>
        <button
          className={`group/created flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'created' ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => setFilters((prev) => ({ ...prev, sort: 'created' }))}
        >
          Created
          <ClockIcon className='w-6 h-6 ml-2 duration-500 transition-transform' />
        </button>
        <button
          className={`group/updated flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'updated' ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => setFilters((prev) => ({ ...prev, sort: 'updated' }))}
        >
          Updated
          <PencilSquareIcon className='w-6 h-6 ml-2 duration-500 transition-transform' />
        </button>
        <button
          className={`group/full_name flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'full_name' ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => setFilters((prev) => ({ ...prev, sort: 'full_name' }))}
        >
          Name
          <DocumentTextIcon className='w-6 h-6 ml-2 duration-500 transition-transform' />
        </button>
      </div>
    </div>
  );
}
