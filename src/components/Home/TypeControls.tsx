import React from 'react';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function TypeControls({ selected, onToggle }: { selected: string[]; onToggle: (type: string) => void }) {
  return (
    <div className='space-y-3'>
      <div>
        <h3 className='text-sm font-bold text-gray-900 dark:text-white mb-1'>Repository Type</h3>
        <p className='text-xs text-gray-600 dark:text-gray-400'>Filter by ownership</p>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <button
          className={`group relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all overflow-hidden ${
            selected.includes('owner')
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-600 hover:scale-105'
          }`}
          onClick={() => onToggle('owner')}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${selected.includes('owner') ? 'opacity-50' : ''}`}></div>
          <UserIcon className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ${selected.includes('owner') ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className='relative z-10'>Owner</span>
        </button>
        <button
          className={`group relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all overflow-hidden ${
            selected.includes('member')
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-600 hover:scale-105'
          }`}
          onClick={() => onToggle('member')}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${selected.includes('member') ? 'opacity-50' : ''}`}></div>
          <UserGroupIcon className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ${selected.includes('member') ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className='relative z-10'>Member</span>
        </button>
      </div>
    </div>
  );
}
