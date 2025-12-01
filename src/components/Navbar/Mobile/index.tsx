"use client";
import React, { useState } from 'react';
import Logo from '../../../assets/images/TextLogo.png';
import { BuyMeACoffee } from '../../BuyMeACoffee';

export const Mobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(o => !o);

  return (
    <nav className='bg-gradient-to-r from-primary-500 z-50 to-primary-800 px-5 py-2.5 fixed w-screen top-0 left-0'>
      <div className='container flex flex-wrap items-center justify-between'>
        <a href='#' className='w-32 drop-shadow-lg'>
          <img src={Logo} alt='Logo GitFest' className='w-full' />
        </a>
        <button
          onClick={handleToggle}
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-primary-300 bg-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:bg-primary-300 focus:text-primary-100'
        >
          <span className='sr-only'>Open main menu</span>
          <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd'></path>
          </svg>
        </button>
        <div className={`w-full transition-all ease-in-out duration-1000 overflow-hidden ${isOpen ? 'max-h-80' : 'max-h-0'}`}>
          <ul className='flex mt-5 flex-col p-4 border border-primary-300 rounded-lg bg-gradient-to-r from-primary-500 to-primary-800'>
            <li>
              <a
                href='https://www.buymeacoffee.com/igorcbraz'
                target='_blank'
                rel='noreferrer'
                className='group/buyCoffee flex justify-center items-center font-medium shadow-lg w-full h-10 text-white duration-300 transition-all border-2 border-primary-300 py-2 rounded-md bg-primary-300 hover:shadow-primary-100 hover:border-primary-100 hover:scale-110'
              >
                <BuyMeACoffee
                  containerClassName='w-10 h-12'
                  borderClassName='group-hover/buyCoffee:fill-primary-100 fill-primary-600 transition'
                  coffeeClassName='group-hover/buyCoffee:fill-primary-50 fill-primary-200 transition'
                />
                Buy me a Coffee
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
