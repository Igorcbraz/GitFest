import React, { useContext } from 'react'

import { Navbar } from '../components/Navbar'
import { Github } from '../components/Github'
import { AuthContext } from '../App'
import { supabase } from '../service/client'

import Preview from '../assets/images/dark-template.png'

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
    <div className='bg-white h-screen'>
      <Navbar/>
      <section className='flex justify-center pb-5 mt-20 h-screen md:pt-32 md:mt-0'>
        <div className='flex justify-between flex-wrap-reverse w-11/12 md:flex-nowrap gap-0 md:w-3/4 md:gap-4 text-white'>
          <div className='flex flex-col justify-between items-center'>
            <span className='mt-10 md:mt-16'>
              <h1 className='text-[1.7rem] md:text-[3rem] font-bold text-gray-900'>
                Create a <span className='text-primary-400'>festival lineup</span> <br/>
                from your top repositories.
              </h1>
              <hr className='w-full md:w-[85%] bg-gradient-to-r from-primary-500 to-primary-450 h-1 border-0 mb-5 mt-[-0.5rem] md:mt-[-0.7rem]'
              />
              <p className='text-base text-justify w-full leading-6 text-gray-700 md:leading-7 md:w-5/6'>
                Explore the selection of your best repositories and create an incredible lineup for your dream festival.
              </p>
              <span className='flex justify-center items-center md:justify-start'>
                <button
                  className='group/btngithub flex justify-evenly items-center w-fit shadow-lg shadow-primary-100 transition bg-primary-500 text-white font-bold py-3 px-10 rounded-full mt-6 hover:bg-primary-400 gap-4 md:mt-10 md:px-6'
                  onClick={(e) => signInWithGithub(e)}
                >
                  Login With Github
                  <Github
                    iconClassname='w-5 h-5 ml-0 fill-current md:ml-2'
                  />
                </button>
              </span>
            </span>
          </div>
          <img
            src={Preview}
            alt='Preview do resultado final'
            className='w-full md:w-5/12 border-4 border-primary-300 rounded-lg shadow-lg shadow-gray-800'
          />
        </div>
      </section>
    </div>
  );
}
