import './globals.css';
import React from 'react';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'GitFest',
  description: 'Create a festival lineup from your top repositories.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-zinc-900">
        <AuthProvider>
          {children}
          <hr className='border-gray-50 border-solid border-t-2 dark:border-zinc-800'/>
          <footer className='bg-white flex justify-center items-center flex-col w-screen h-fit py-5 dark:bg-zinc-900'>
            <h2 className='text-lg font-bold text-start text-gray-800 dark:text-gray-300'>
              Made with 💜 by
              <span className='ml-2 text-primary-400 underline'>
                <a href='https://igorcbraz.me' target='_blank' rel='noreferrer'>
                  Igorcbraz
                </a>
              </span>
            </h2>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
