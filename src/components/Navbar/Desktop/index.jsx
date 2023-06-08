import {
  InformationCircleIcon
} from '@heroicons/react/24/solid'

import Logo from '../../../assets/images/TextLogo.png';
import { BuyMeACoffee } from '../../BuyMeACoffee';

export const Desktop = () => {
  return (
    <>
      <nav className='flex justify-center fixed z-50 w-full h-24 pb-6 bg-gradient-to-r from-primary-700 to-primary-200'>
        <div className='flex items-center justify-between gap-2 w-4/5 h-24 relative' id='navbar-default'>
          <span>
            <InformationCircleIcon
              className='w-7 h-7 text-white hover:text-primary-200 duration-300 transition-all cursor-pointer'
            />
          </span>
          <a href='#' className='w-[15%] drop-shadow-lg'>
            <img
              src={Logo}
              alt='Logo gitfest'
              className='w-full'
            />
          </a>
          <a
            href='https://www.buymeacoffee.com/igorcbraz'
            target='_blank'
            rel='noreferrer'
            className='group/buyCoffee flex justify-center items-center font-medium shadow-lg w-48 h-10 text-white duration-300 transition-all border-2 border-primary-300 py-2 rounded-md bg-primary-300 hover:shadow-primary-100 hover:border-primary-100 hover:scale-110'
          >
            <BuyMeACoffee
              containerClassName='w-10 h-12'
              borderClassName='group-hover/buyCoffee:fill-primary-100 fill-primary-600 transition'
              coffeeClassName='group-hover/buyCoffee:fill-primary-50 fill-primary-200 transition'
            />
            Buy me a Coffee
          </a>
          <hr className='flex self-end w-full bg-gradient-to-t from-primary-900 to-secondary-200 h-[1.2px] border-0 absolute'/>
        </div>
      </nav>
    </>
  )
}
