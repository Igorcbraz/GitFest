"use client";
import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../../ThemeToggle';

export const Mobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const handleToggle = () => setIsOpen(o => !o);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('scroll', handleScroll);
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className="fixed z-50 top-0 left-0 right-0 flex justify-center"
      style={{
        transform: isScrolled ? 'translateY(0.75rem)' : 'translateY(0)',
        transition: 'transform 1.2s cubic-bezier(0.33, 1, 0.68, 1)'
      }}
    >
      <div
        className="w-full"
        style={{
          paddingLeft: isScrolled ? '4%' : '0',
          paddingRight: isScrolled ? '4%' : '0',
          transition: 'padding 1.2s cubic-bezier(0.33, 1, 0.68, 1)'
        }}
      >
        <div
          style={{
            borderRadius: isScrolled ? '1rem' : '0',
            backgroundColor: isScrolled
              ? (isDark ? 'rgba(24, 24, 27, 0.7)' : 'rgba(255, 255, 255, 0.7)')
              : (isDark ? 'rgba(24, 24, 27, 0.6)' : 'rgba(255, 255, 255, 0.6)'),
            backdropFilter: isScrolled ? 'blur(24px)' : 'blur(8px)',
            boxShadow: isScrolled
              ? '0 25px 50px -12px rgba(149, 117, 205, 0.15), 0 0 60px rgba(149, 117, 205, 0.08)'
              : 'none',
            borderWidth: isScrolled ? '1px' : '0',
            borderColor: isScrolled
              ? (isDark ? 'rgba(149, 117, 205, 0.3)' : 'rgba(149, 117, 205, 0.2)')
              : 'transparent',
            transition: 'border-radius 1.2s cubic-bezier(0.33, 1, 0.68, 1), background-color 1.2s cubic-bezier(0.33, 1, 0.68, 1), backdrop-filter 1.2s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 1.3s cubic-bezier(0.33, 1, 0.68, 1), border-width 1.2s cubic-bezier(0.33, 1, 0.68, 1), border-color 1.2s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          <div
            className="container"
            style={{
              paddingLeft: isScrolled ? '1rem' : undefined,
              paddingRight: isScrolled ? '1rem' : undefined,
              transition: 'padding 1.2s cubic-bezier(0.33, 1, 0.68, 1)'
            }}
          >
          <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <a href='/' className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center'>
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className='text-xl font-bold'>
              <span className='text-gray-900 dark:text-white'>Git</span>
              <span className='text-gradient-primary'>Fest</span>
            </h1>
          </a>

          {/* Mobile Actions */}
          <div className='flex items-center gap-3'>
            <ThemeToggle />
            <button
              onClick={handleToggle}
              type='button'
              className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 transition-colors'
              aria-label='Toggle menu'
            >
              {isOpen ? (
                <XMarkIcon className='w-6 h-6' />
              ) : (
                <Bars3Icon className='w-6 h-6' />
              )}
            </button>
          </div>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          maxHeight: isOpen ? '20rem' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden'
        }}
      >
        <div
          className="container pb-4"
          style={{
            paddingLeft: isScrolled ? '1rem' : undefined,
            paddingRight: isScrolled ? '1rem' : undefined,
            transition: 'padding 1.2s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        >
          <div className='flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700'>
            <a
              href='https://github.com/Igorcbraz/GitFest#readme'
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm'
              onClick={handleToggle}
            >
              <InformationCircleIcon className='w-4 h-4' />
              <span>About</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
