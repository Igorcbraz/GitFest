import React from 'react';
import { ArrowUturnLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function FooterActions({ onClear, onDownload }: { onClear: () => void; onDownload: () => void }) {
  return (
    <div className='space-y-3 w-full'>
      <h3 className='text-sm font-bold text-white mb-1'>Actions</h3>
      <button
        className='group relative flex items-center justify-center gap-2.5 w-full px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl transition-all text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 overflow-hidden'
        onClick={onDownload}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
        <ArrowDownTrayIcon className='relative z-10 w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300' />
        <span className='relative z-10'>Download Poster</span>
      </button>

      <button
        className='group relative flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all text-xs backdrop-blur-sm border border-white/20 hover:border-white/30 hover:scale-105 active:scale-95 overflow-hidden'
        onClick={onClear}
      >
        <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
        <ArrowUturnLeftIcon className='relative z-10 w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300' />
        <span className='relative z-10'>Reset Filters</span>
      </button>
    </div>
  );
}

