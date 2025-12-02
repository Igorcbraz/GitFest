'use client'
import React from 'react'
import { Github } from '../Github'
import { BuyMeACoffee } from '../BuyMeACoffee'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='relative mt-20 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950 border-t border-gray-200 dark:border-zinc-800'>
      <div className='container py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8'>
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>G</span>
              </div>
              <h2 className='text-2xl font-bold'>
                <span className='text-gray-900 dark:text-white'>Git</span>
                <span className='text-gradient-primary'>Fest</span>
              </h2>
            </div>
            <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
              Transform your GitHub repositories into stunning festival lineup posters. Share your coding journey in style.
            </p>
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com/Igorcbraz/GitFest'
                target='_blank'
                rel='noreferrer'
                className='flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors'
                aria-label='GitHub Repository'
              >
                <Github iconClassname='w-5 h-5 fill-white dark:fill-gray-900' />
              </a>
            </div>
          </div>
          <div>
            <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4'>
              Product
            </h3>
            <ul className='space-y-3'>
              <li>
                <a href='/' className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm'>
                  Home
                </a>
              </li>
              <li>
                <a href='/home' className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm'>
                  Create Lineup
                </a>
              </li>
              <li>
                <a href='https://github.com/Igorcbraz/GitFest#-features' target='_blank' rel='noreferrer' className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm'>
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4'>
              Resources
            </h3>
            <ul className='space-y-3'>
              <li>
                <a href='https://github.com/Igorcbraz/GitFest' target='_blank' rel='noreferrer' className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm'>
                  GitHub
                </a>
              </li>
              <li>
                <a href='https://github.com/Igorcbraz/GitFest#readme' target='_blank' rel='noreferrer' className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm'>
                  Documentation
                </a>
              </li>
              <li>
                <a href='https://github.com/Igorcbraz/GitFest/issues' target='_blank' rel='noreferrer' className='text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm'>
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4'>
              Support
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed'>
              Love GitFest? Support the project and help us keep it free!
            </p>
            <a
              href='https://www.buymeacoffee.com/igorcbraz'
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold text-sm shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 hover:-translate-y-0.5 transition-all'
            >
              <BuyMeACoffee
                containerClassName='w-5 h-5'
                borderClassName='fill-gray-900'
                coffeeClassName='fill-gray-900/80'
              />
              Buy me a Coffee
            </a>
          </div>
        </div>
        <div className='mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center md:text-left'>
              Copyright © {currentYear} GitFest. All rights reserved.
            </p>
            <div className='flex items-center gap-6'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Made with 💜 by Igor Braz
              </span>
              <span className='text-gray-300 dark:text-zinc-700'>|</span>
              <a href='https://github.com/Igorcbraz/GitFest/blob/main/LICENSE' target='_blank' rel='noreferrer' className='text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>
                MIT License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
