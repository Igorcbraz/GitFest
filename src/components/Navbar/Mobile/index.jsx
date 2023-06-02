import { useState } from 'react'

import Logo from '../../../assets/images/TextColorLogo.png'

export const Mobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleActivationNavItem = (id, item) => {
    window.location.href = item
    setSelectedItem(id)
    handleToggle()
  }

  return (
    <nav className='bg-gradient-to-r from-primary-500 z-50 to-primary-800 px-2 py-2.5 fixed w-screen top-0 left-0'>
      <div className='container flex flex-wrap items-center justify-between'>
        <a href='#' className='flex items-center'>
          <img src={Logo} className='h-14' alt='Enkoji Logo' />
        </a>
        <button
          onClick={handleToggle}
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-primary-300 bg-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:bg-primary-300 focus:text-primary-100'
        >
          <span className='sr-only'>Open main menu</span>
          <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd'></path></svg>
        </button>
        <div className={`w-full mt-2 ${isOpen ? '' : 'hidden'}`}>
          <ul className='flex flex-col p-4 mt-4g gap-2 border border-primary-300 rounded-lg bg-gradient-to-r from-primary-500 to-primary-800 '>
            <li>
              <button
                onClick={() => handleActivationNavItem(1, '#history')}
                className={`block py-2 pl-3 pr-4 w-full text-start text-white rounded ${selectedItem === 1 ? 'bg-primary-400' : ''}`}
              >
                Sobre nós
              </button>
            </li>
            <li>
              <button
                onClick={() => handleActivationNavItem(2, '#buddhism')}
                className={`block py-2 pl-3 pr-4 w-full text-start text-white rounded ${selectedItem === 2 ? 'bg-primary-400' : ''}`}
              >
                Budismo
              </button>
            </li>
            <li>
              <button
                onClick={() => handleActivationNavItem(3, '#infos')}
                className={`block py-2 pl-3 pr-4 w-full text-start text-white rounded ${selectedItem === 3 ? 'bg-primary-400' : ''}`}
              >
                Programação
              </button>
            </li>
            <li>
              <a
                href='#'
                target='_blank'
                rel='noreferrer'
                className='block py-2 pl-3 pr-4 text-white rounded hover:bg-primary-800'
              >
                Contribuição
              </a>
            </li>
            <li>
              <button
                onClick={() => handleActivationNavItem(4, '#gallery')}
                className={`block py-2 pl-3 pr-4 w-full text-start text-white rounded ${selectedItem === 4 ? 'bg-primary-400' : ''}`}
              >
                Mídia
              </button>
            </li>
            <li>
              <button
                onClick={() => handleActivationNavItem(5, '#infos')}
                className={`block py-2 pl-3 pr-4 w-full text-start text-white rounded ${selectedItem === 5 ? 'bg-primary-400' : ''}`}
              >
                Visite
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
