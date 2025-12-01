import React from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

export default function HeaderBar({ username, bio, onLogout }: { username: string; bio?: string | null; onLogout: () => void }) {
  return (
    <header className='bg-white dark:bg-zinc-900'>
      <section className='flex justify-between items-center flex-wrap-reverse gap-5 p-6 h-fit w-screen'>
        <span>
          <h1 className='text-3xl font-bold text-start text-gray-800 dark:text-gray-200'>
            Welcome <span className='text-primary-400'>{username}</span> 👋
          </h1>
          <p className='text-lg text-start text-gray-600 mt-2 dark:text-gray-400'>{bio}</p>
        </span>
        <div className='flex justify-end items-center h-10 gap-5'>
          <ThemeToggle />
          <button
            className='flex justify-between items-center w-fit h-10 bg-primary-100 text-primary-300 font-bold py-2 px-6 rounded transition hover:bg-primary-200 hover:text-primary-100 hover:scale-95'
            onClick={onLogout}
          >
            Sair
            <ArrowLeftOnRectangleIcon className='w-6 h-6 ml-2' />
          </button>
        </div>
      </section>
    </header>
  );
}
