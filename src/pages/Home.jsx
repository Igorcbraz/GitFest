import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App'
import { supabase } from '../service/client'
import {
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/solid'

export const Home = () => {
  const { dispatch } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [info, setInfo] = useState({})
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    if (user?.user_metadata) {
      handleFetchMoreInfo()
    }
  }, [user])

  useEffect(() => {
    if (info?.repos_url) {
      handleFetchRepositories(info?.repos_url)
    }
  }, [info])

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error(error)
      return
    }

    await getUser(data.session.access_token)
  }

  async function getUser(accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken)

    if (error) {
      console.error(error)
      return
    }
    console.log(data.user)
    setUser(data.user)
  }

  const handleFetchMoreInfo = async () => {
    const response = await fetch('https://api.github.com/users/' + user.user_metadata.preferred_username)
    const data = await response.json()

    const moreInfo = {
      bio: data.bio,
      blog: data.blog,
      company: data.company,
      followers: data.followers,
      public_repos: data.public_repos,
      repos_url: data.repos_url,
      twitter_username: data.twitter_username
    }

    setInfo(moreInfo)
  }

  const handleFetchRepositories = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    const orderedDataByStars = data.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count
    })

    const formatedData = orderedDataByStars.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        homepage: item.homepage,
        is_template: item.is_template,
        language: item.language,
        stargazers_count: item.stargazers_count,
        topics: item.topics,
        created_at: item.created_at,
        updated_at: item.updated_at
      }
    })

    setRepositories(formatedData)
    console.log(repositories)
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error(error)
      return
    }

    dispatch({
      type: 'LOGOUT'
    })
    return window.location.href = '/'
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='flex justify-center items-center flex-col'>
          <div
            className='inline-block h-8 w-8 animate-spin rounded-full text-primary-400 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <header className='bg-white'>
      <section className='flex justify-between items-center  p-6 h-fit w-screen'>
        <div className='w-full'>
          <h1 className='text-3xl font-bold text-start text-gray-800'>Bem-vindo(a) <span className='text-primary-400'>{user.user_metadata?.preferred_username}</span></h1>
          <p className='text-lg text-start text-gray-600 mt-2'>Você está logado(a) com o e-mail <span className='text-primary-400'>{user.email}</span></p>
        </div>
        <div className='flex justify-end items-center w-full h-10'>
          <button
            className='flex justify-between w-fit bg-primary-100 text-primary-300 font-bold py-2 px-6 rounded transition hover:bg-primary-200 hover:text-primary-100 hover:scale-95'
            onClick={handleLogout}
          >
            Sair
            <ArrowLeftOnRectangleIcon
              className='w-6 h-6 ml-2'
            />
          </button>
        </div>
      </section>
    </header>
  )
}
