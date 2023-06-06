import React, { useContext, useEffect, useState } from 'react'
import { animated, useSpring, config } from '@react-spring/web'
import {
  ArrowLeftOnRectangleIcon,
  ArrowDownTrayIcon
  // ShareIcon
} from '@heroicons/react/24/solid'

import { AuthContext } from '../App'
import { supabase } from '../service/client'

import { DarkTemplate } from '../components/Templates/Dark/index.jsx'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 25, (x - window.innerWidth / 5) / 25, 1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export const Home = () => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}))
  const { dispatch } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [info, setInfo] = useState({})
  const [repositories, setRepositories] = useState([])
  const [darkTemplateNames, setDarkTemplateNames] = useState([])


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
    setDarkTemplateNames(formatedData.map(item => item.name))
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

  const handleDownloadSvg = (templateId) => {
    const svg = document.getElementById(templateId)
    const canvas = document.createElement('canvas')

    if (!svg) {
      return console.error('svg not found')
    }

    canvas.width = svg.clientWidth
    canvas.height = svg.clientHeight

    const styleTag = svg.querySelector('style')
    const cssStyles = `
      .cls-1 {
        fill: url(#linear-gradient);
      }

      .cls-2 {
        fill: #2f2f2f;
      }

      .cls-11, .cls-12, .cls-13, .cls-2, .cls-4, .cls-8, .cls-9 {
        fill-rule: evenodd;
      }

      .cls-3 {
        opacity: 0.2;
      }

      .cls-4 {
        fill: none;
        stroke: #2f2f2f;
        stroke-width: 1px;
      }

      .cls-5 {
        font-size: 118.249px;
      }

      .cls-13, .cls-5, .cls-6, .cls-7 {
        fill: #fff;
      }

      .cls-5, .cls-6 {
        font-family: ø, Lolapeluza;
      }

      .cls-6 {
        font-size: 123.943px;
      }

      .cls-8 {
        fill: #653371;
      }

      .cls-10, .cls-9 {
        fill: #fdf9ff;
      }

      .cls-10 {
        font-size: 63.488px;
        font-family: "Bebas Kai";
      }

      .cls-11 {
        fill: #b074ad;
      }

      .cls-12 {
        fill: #dd9f87;
      }
    `
    styleTag.textContent = cssStyles

    const serializer = new XMLSerializer()
    let source = serializer.serializeToString(svg)

    // Adiciona os namespaces se necessário
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
    }
    if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source

    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)

    const img = new Image()
    img.src = url

    img.onload = function() {
      canvas.getContext('2d')?.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.download = 'dark-template.png'
      a.href = canvas.toDataURL()
      a.click()
    }
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
    <>
      <header className='bg-white'>
        <section className='flex justify-between items-center  p-6 h-fit w-screen'>
          <div className='w-full'>
            <h1 className='text-3xl font-bold text-start text-gray-800'>Bem-vindo(a) <span className='text-primary-400'>{user.user_metadata?.preferred_username}</span></h1>
            <p className='text-lg text-start text-gray-600 mt-2'>{info.bio}</p>
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
      <section className='flex justify-between items-center px-6 h-fit w-screen'>
        <animated.div
          className='relative inline-block'
          onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
          onMouseLeave={() => set({xys:[0,0,1]})}
          style={{
            transform: props.xys.interpolate(trans)
          }}
        >
          <DarkTemplate
            username={user.user_metadata?.preferred_username}
            repositoriesNames={darkTemplateNames}
            className='w-[460px] h-[570px] border-4 border-primary-300 rounded-lg shadow-lg shadow-gray-800'
          />
          <button
            className='absolute bottom-0 right-0 mr-4 mb-3 bg-white shadow-lg shadow-gray-800 text-primary-300 font-bold p-2 rounded-full transition hover:bg-primary-200 hover:text-primary-100 hover:scale-110'
            onClick={() => handleDownloadSvg('dark-template')}
          >
            <ArrowDownTrayIcon
              className='w-6 h-6'
            />
          </button>
          {/* <button
            className='absolute bottom-0 right-0 mr-[4.5rem] mb-3 bg-white shadow-lg shadow-gray-800 text-primary-300 font-bold p-2 rounded-full transition hover:bg-primary-200 hover:text-primary-100 hover:scale-110'
            onClick={() => handleDownloadSvg('dark-template')}
          >
            <ShareIcon
              className='w-6 h-6 pr-1'
            />
          </button> */}
        </animated.div>
      </section>
    </>
  )
}
