import React from 'react';
import { ArrowUturnLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

export default function FooterActions({ onClear, onDownload }: { onClear: () => void; onDownload: () => void }) {
  return (
    <div className='flex justify-between  items-center gap-2 h-fit w-full md:w-[90%] md:justify-end'>
      <button className='flex justify-between w-fit bg-transparent text-primary-300 font-medium py-2 px-6 rounded transition hover:bg-primary-50 dark:hover:bg-zinc-800' onClick={onClear}>
        Clear Filters
        <ArrowUturnLeftIcon className='w-6 h-6 ml-2' />
      </button>
      <button className='flex justify-between w-fit bg-primary-400 text-primary-50 font-bold py-2 px-6 rounded transition hover:bg-primary-500 hover:text-primary-100' onClick={onDownload}>
        Download
        <ArrowDownTrayIcon className='w-6 h-6 ml-2' />
      </button>
    </div>
  );
}
