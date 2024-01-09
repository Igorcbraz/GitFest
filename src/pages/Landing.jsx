import React, { useContext, useState } from 'react'
import { animated, config, useSpring } from '@react-spring/web'
import { useNavigate } from 'react-router-dom'

import { Navbar } from '../components/Navbar'
import { Github } from '../components/Github'
import { AuthContext } from '../App'
import { supabase } from '../service/client'

import Preview from '../assets/images/dark-template.png'

import {
  ArrowRightCircleIcon
} from '@heroicons/react/24/outline'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 40, (x - window.innerWidth) / 35, 1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export const Landing = () => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}))
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [githubUsername, setGithubUsername] = useState('')

  const checkUserExists = async (username) => {
    try {
      const response = await fetch('https://api.github.com/users/' + username)

      if (response.status !== 200) {
        throw new Error('Username not found')
      }

      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const signIn = async (OAuth) => {
    try {
      if (OAuth) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: `${window.location.origin}/home`
          }
        })

        if (error) {
          throw new Error(error.message)
        }
      } else {
        await checkUserExists(githubUsername)
      }

      dispatch({
        type: 'LOGIN',
        payload: { isLoggedIn: true }
      })

      if (!OAuth) {
        dispatch({
          type: 'SET_GITHUB_USERNAME',
          payload: { githubUsername }
        })
        navigate('/home')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='bg-white h-screen'>
      <Navbar/>
      <section className='flex justify-center pb-5 mt-20 h-screen md:pt-32 md:mt-0'>
        <div className='flex justify-between flex-wrap-reverse w-11/12 md:flex-nowrap gap-0 md:w-3/4 md:gap-32 text-white'>
          <div className='flex flex-col justify-between items-center'>
            <div className='flex flex-col items-start mt-10 md:mt-16'>
              <h1 className='text-[1.7rem] md:text-[3rem] font-bold text-gray-900'>
                Create a <span className='text-primary-400'>festival lineup</span> <br/>
                from your top repositories.
              </h1>
              <hr className='w-full md:w-[85%] bg-gradient-to-r from-primary-500 to-primary-450 h-1 border-0 mb-5 mt-[-0.5rem] md:mt-[-0.7rem]'
              />
              <p className='text-base text-justify w-full leading-6 text-gray-700 md:leading-7 md:w-5/6'>
                Explore the selection of your best repositories and create an incredible lineup for your dream festival.
              </p>
              <div className='w-full flex flex-col justify-center items-center gap-5'>
                <form className='flex justify-between items-center mt-10 gap-3 w-full'
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (githubUsername !== '') {
                      signIn(false)
                    }
                  }}
                >
                  <input
                    type='text'
                    placeholder='Github Username'
                    className='w-full h-12 px-4 rounded-lg shadow-sm shadow-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 text-gray-700 font-bold text-base'
                    onChange={(e) => setGithubUsername(e.target.value)}
                    value={githubUsername}
                  />
                  <button
                    type='submit'
                    className={`flex justify-evenly items-center w-2/12 h-12 shadow-lg shadow-primary-100 transition text-white font-bold py-3 px-4 rounded-lg md:px-6 ${githubUsername === '' ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400/90' : 'bg-primary-500 hover:bg-primary-400'}`}
                    disabled={githubUsername === ''}
                  >
                    <ArrowRightCircleIcon className='w-7 h-7'/>
                  </button>
                </form>
                <div className='w-full flex justify-center items-center'>
                  <hr className='w-1/5 bg-gray-200 h-0.5 border-0'/>
                  <span className='mx-2 text-gray-400'>or</span>
                  <hr className='w-1/5 bg-gray-200 h-0.5 border-0'/>
                </div>
                <span className='w-full flex justify-center items-center'>
                  <button
                    className='group/btngithub flex justify-evenly items-center w-1/2 h-12 shadow-lg shadow-primary-100 transition bg-primary-500 text-white font-bold py-3 px-4 rounded-lg  hover:bg-primary-400 gap-4 md:px-6 md:w-2/5'
                    onClick={() => signIn(true)}
                  >
                    Login With Github
                    <Github
                      iconClassname='w-5 h-5 ml-0 fill-current md:ml-2'
                    />
                  </button>
                </span>
              </div>
            </div>
          </div>
          <animated.img
            src={Preview}
            onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            alt='Preview do resultado final'
            className='w-full md:w-5/12 border-4 border-primary-300 rounded-lg shadow-lg shadow-gray-800'
            style={{
              transform: props.xys.interpolate(trans)
            }}
          />
        </div>
      </section>
    </div>
  );
}
