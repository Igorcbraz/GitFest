import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <hr className='border-gray-50 border-solid border-t-2 mb-5'/>
    <footer className='flex justify-center items-center flex-col w-screen h-fit my-5'>
      <h2 className='text-lg font-bold text-start text-gray-800'>
        Made with 💜 by
        <span className='ml-2 text-primary-400 underline'>
          <a href='https://igorcbraz.me' target='_blank' rel='noreferrer'>
            Igorcbraz
          </a>
        </span>
      </h2>
    </footer>
  </React.StrictMode>
);
