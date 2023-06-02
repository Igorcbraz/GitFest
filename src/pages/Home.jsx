import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../App'
import { supabase } from '../service/client'

export const Home = () => {
  const { state, dispatch } = useContext(AuthContext)

  if (!state.isLoggedIn) {
    return window.location.href = '/'
  }

  useEffect(() => {
    checkUser()
    window.addEventListener('hashchange', function() {
      checkUser()
    })
  }, [])

  async function checkUser() {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.log(error)
      return
    }

    dispatch({
      type: 'LOGIN',
      payload: { user: data.user, isLoggedIn: true }
    })
  }

  return (
    <div className='bg-white'>
      <section className='flex justify-center pb-5 pt-28 h-screen md:pt-32'>
        <div className='flex flex-col items-center justify-center w-11/12 md:w-3/4 lg:w-1/2'>
          <h1 className='text-4xl font-bold text-center text-gray-800'>Bem vindo <span className='text-blue-500'>{state.user.user_metadata.full_name}</span></h1>
          <p className='text-center text-gray-600'>
            Você está logado com o email <span className='text-blue-500'>{state.user.email}</span>
          </p>
        </div>
      </section>
    </div>
  )
}
