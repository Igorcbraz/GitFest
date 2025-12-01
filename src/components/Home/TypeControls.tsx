import React from 'react';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function TypeControls({ selected, onToggle }: { selected: string[]; onToggle: (type: string) => void }) {
  return (
    <div className='flex justify-start items-start flex-col w-screen h-fit md:w-fit'>
      <span className='w-[90%] md:w-full'>
        <h2 className='text-2xl font-bold text-start text-gray-800 dark:text-gray-300'>Type</h2>
        <p className='text-lg text-start text-gray-600 mt-2 dark:text-gray-500'>Limit results to repositories of the specified type.</p>
      </span>
      <div className='flex justify-start items-center flex-wrap gap-5 mt-5'>
        <button
          className={`group/owner flex justify-between w-fit h-14 ${selected.includes('owner') ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => onToggle('owner')}
        >
          Owner
          <UserIcon className='w-6 h-6 ml-2 group-hover/owner:animate-pulse duration-150' />
        </button>
        <button
          className={`group/member flex justify-between w-fit h-14 ${selected.includes('member') ? 'bg-primary-200 text-primary-50 dark:bg-primary-400 dark:hover:text-primary-100' : 'bg-white text-primary-300 dark:bg-zinc-800 dark:hover:text-primary-400'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
          onClick={() => onToggle('member')}
        >
          Member
          <UserGroupIcon className='w-6 h-6 ml-2 group-hover/member:animate-pulse duration-150' />
        </button>
      </div>
    </div>
  );
}
