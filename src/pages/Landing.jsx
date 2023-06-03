import React, { useContext } from 'react'

import { Navbar } from '../components/Navbar'
import { Github } from '../components/Github'
import { AuthContext } from '../App'
import { supabase } from '../service/client'

import Carrousel1 from '../assets/images/preview.jpg'

export const Landing = () => {
  const { dispatch } = useContext(AuthContext)

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/home`
      }
    })

    if (error) {
      console.log(error)
      return
    }

    dispatch({
      type: 'LOGIN',
      payload: { isLoggedIn: true }
    })
  }

  return (
    <div className='bg-white'>
      <Navbar/>
      <section className='flex justify-center pb-5 pt-28 h-screen md:pt-32'>
        <div className='flex justify-between flex-wrap-reverse w-11/12 md:flex-nowrap gap-4 md:w-3/4 text-white'>
          <div className='flex flex-col justify-between items-center gap-5 md:gap-0'>
            <span className='md:mt-16'>
              <h1 className='text-[2.7rem] md:text-[3rem] font-bold text-gray-900'>
                Create a <span className='text-primary-400'>festival lineup</span> <br/>
                from your top repositories.
              </h1>
              <hr className='w-full md:w-[85%] bg-gradient-to-r from-primary-500 to-primary-450 h-1 border-0 mt-[-0.5rem] md:mt-[-0.7rem] mb-3 md:mb-5'
              />
              <p className='text-sm md:text-base text-justify w-full leading-6 text-gray-700 md:leading-7 md:w-5/6'>
                Explore the selection of your best repositories and create an incredible lineup for your dream festival.
              </p>
              <button
                className='group/btngithub flex gap-4 w-fit shadow-lg shadow-primary-100 transition bg-primary-500 text-white font-bold py-3 px-6 rounded-full mt-10 hover:bg-primary-400'
                onClick={(e) => signInWithGithub(e)}
              >
                Login With Github
                <Github
                  iconClassname='w-5 h-5 ml-2 fill-current'
                />
              </button>
            </span>
          </div>
          <img
            src={Carrousel1}
            alt='Imagem do templo Enkoji'
            className='w-full object-cover md:w-5/12'
          />
        </div>
      </section>
    </div>
  );
}
