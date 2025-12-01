"use client";
import React, { useState, useContext } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../../app/context/AuthContext';

export const ThemeToggle: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { state, dispatch } = auth;
  const [theme, setTheme] = useState(state.theme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  return (
    <button
      className={`flex justify-between items-center w-fit h-10 font-bold py-2 px-6 rounded transition hover:bg-primary-200 hover:text-primary-100 hover:scale-95 ${theme === 'dark' ? 'bg-primary-300 text-primary-100' : 'bg-primary-100 text-primary-300'}`}
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
    </button>
  );
};
