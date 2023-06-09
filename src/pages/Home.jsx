import React, { useContext, useEffect, useState } from 'react'
import { animated, useSpring, config } from '@react-spring/web'
import {
  ArrowLeftOnRectangleIcon,
  ArrowDownTrayIcon,
  MoonIcon,
  SunIcon,
  ArrowPathIcon,
  ArrowDownIcon,
  ArrowUturnLeftIcon
  // ShareIcon
} from '@heroicons/react/24/solid'

import {
  StarIcon,
  ClockIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

import { AuthContext } from '../App'
import { supabase } from '../service/client'
import { styles } from '../utils/svgStyles'

import { DarkTemplate } from '../components/Templates/Dark/index.jsx'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 25, (x - window.innerWidth / 5) / 25, 1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export const Home = () => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}))
  const { dispatch } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [info, setInfo] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [repositories, setRepositories] = useState([])
  const [filterRepositories, setFilterRepositories] = useState([])
  const [filters, setFilters] = useState({
    theme: 'dark',
    invertColors: false,
    sort: 'stars',
    order: 'asc',
    type: ['owner']
  })

  useEffect(() => {
    if (info?.repos_url) {
      handleApplyFilters()
    }
  }, [filters.sort, filters.order, filters.type])

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

    const formattedData = formatRepositories(orderedDataByStars)

    setRepositories(formattedData)
    setFilterRepositories(formattedData.map(item => item.name))
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
    styleTag.textContent = styles.template1

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

  const handleFilterType = (type) => {
    if (filters.type.includes(type)) {
      const newType = filters.type.filter(item => item !== type)

      if (newType.length === 0) {
        return setFilters({ ...filters, type: ['owner'] })
      }

      setFilters({ ...filters, type: newType })
    } else {
      setFilters({ ...filters, type: [...filters.type, type] })
    }
  }

  const handleApplyFilters = async () => {
    const { type, order, sort } = filters
    const url = new URL(info.repos_url)
    url.searchParams.append('direction', order)

    if (sort !== 'stars') {
      url.searchParams.append('sort', sort)
    }

    if (type.length === 1) {
      url.searchParams.append('type', type[0])
    } else {
      url.searchParams.append('type', 'all')
    }

    const response = await fetch(url)
    let data = await response.json()


    if (sort === 'stars') {
      data = data.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count
      })
    }

    const formattedRepositories = formatRepositories(data)

    setFilterRepositories(formattedRepositories.map(item => item.name))
  }

  const formatRepositories = (repositories) => {
    const formatedData = repositories.map(item => {
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

    return formatedData
  }

  const clearFilters = () => {
    setFilters({
      theme: 'dark',
      invertColors: false,
      sort: 'stars',
      order: 'asc',
      type: ['owner']
    })
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
        <section className='flex justify-between items-center flex-wrap-reverse gap-5 p-6 h-fit w-screen'>
          <span>
            <h1 className='text-3xl font-bold text-start text-gray-800'>Welcome <span className='text-primary-400'>{user.user_metadata?.preferred_username}</span> 👋</h1>
            <p className='text-lg text-start text-gray-600 mt-2'>{info.bio}</p>
          </span>
          <div className='flex justify-end items-center h-10'>
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
      <hr className='border-gray-50 border-solid border-t-2 mb-5'/>
      <section className='grid grid-cols-1 px-6 w-screen min-h-[90vh] mb-6 md:grid-cols-2'>
        <div className='flex justify-center mb-5 md:mb-0'>
          <animated.div
            className='relative inline-block w-fit h-fit md:w-[33vw]'
            onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            style={{
              transform: props.xys.interpolate(trans)
            }}
          >
            <DarkTemplate
              username={user.user_metadata?.preferred_username}
              data={filterRepositories}
              invertColors={filters.invertColors}
              className='w-full h-full border-4 border-primary-300 rounded-lg shadow-lg shadow-gray-800'
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
        </div>
        <div className='flex justify-between items-start flex-col gap-10 mt-4 md:justify-evenly md:gap-0 md:mt-0'>
          <div className='flex justify-start items-start flex-col w-screen pr-4 h-fit md:w-fit'>
            <h2 className='text-2xl font-bold text-start text-gray-800'>Theme</h2>
            <p className='text-lg text-start text-gray-600 mt-2'>
              Theme the template should be
            </p>
            <div className='flex justify-start items-center flex-wrap gap-5 mt-5'>
              <button
                className={`group/dark flex justify-between items-center w-28 md:w-fit h-20 md:h-14 ${filters.theme === 'dark' ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => setFilters({ ...filters, theme: 'dark' })}
              >
                Dark
                <MoonIcon
                  className='w-6 h-6 ml-2 group-hover/dark:animate-pulse duration-150'
                />
              </button>
              <button
                className={`group/light flex justify-between items-center w-40 md:w-fit h-20 md:h-14 ${filters.theme === 'light' ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => setFilters({ ...filters, theme: 'light' })}
                disabled
              >
                Light (Em Breve)
                <SunIcon
                  className='w-6 h-6 ml-2 group-hover/light:animate-pulse duration-150'
                />
              </button>
              <button
                className={`group/invert flex justify-between items-center row-span-2 w-48 md:w-fit h-20 md:h-14 ${filters.invertColors ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => setFilters({ ...filters, invertColors: !filters.invertColors })}
              >
                Invert Colors
                <ArrowPathIcon
                  className={`w-6 h-6 ml-2 duration-500 transition-transform ${filters.invertColors ? '-rotate-180' : 'rotate-0'} transform group-hover/invert:-rotate-180`}
                />
              </button>
            </div>
          </div>
          <div className='flex justify-start items-start flex-col w-screen pr-4 h-fit md:w-fit'>
            <div className='flex flex-row justify-between items-center flex-wrap w-full'>
              <span>
                <h2 className='text-2xl font-bold text-start text-gray-800'>
                  Sort ({filters.order === 'asc' ? 'Ascending' : 'Descending'})
                </h2>
                <p className='text-lg text-start text-gray-600 mt-2'>
                  The property to sort the results by.
                </p>
              </span>
              <button
                className='text-primary-300 mr-5'
                onClick={() => setFilters({ ...filters, order: filters.order === 'asc' ? 'desc': 'asc' })}
              >
                <ArrowDownIcon
                  className={`w-6 h-6 ml-2 duration-500 transition-transform ${filters.order === 'asc' ? 'rotate-0' : 'rotate-180'}`}
                />
              </button>
            </div>
            <div className='flex justify-start items-center flex-wrap gap-5 mt-5'>
              <button
                className={`group/stars flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'stars' ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => setFilters({ ...filters, sort: 'stars' })}
              >
                Stars
                <StarIcon
                  className='w-6 h-6 ml-2 duration-500 transition-transform'
                />
              </button>
              <button
                className={`group/created flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'created' ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => setFilters({ ...filters, sort: 'created' })}
              >
                Created
                <ClockIcon
                  className='w-6 h-6 ml-2 duration-500 transition-transform'
                />
              </button>
              <button
                className={`group/updated flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'updated' ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => setFilters({ ...filters, sort: 'updated' })}
              >
                Updated
                <PencilSquareIcon
                  className='w-6 h-6 ml-2 duration-500 transition-transform'
                />
              </button>
              <button
                className={`group/full_name flex justify-between w-32 md:w-fit h-14 ${filters.sort === 'full_name' ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => setFilters({ ...filters, sort: 'full_name' })}
              >
                Name
                <DocumentTextIcon
                  className='w-6 h-6 ml-2 duration-500 transition-transform'
                />
              </button>
            </div>
          </div>
          <div className='flex justify-start items-start flex-col w-screen h-fit md:w-fit'>
            <span className='w-[90%] md:w-full'>
              <h2 className='text-2xl font-bold text-start text-gray-800'>Type</h2>
              <p className='text-lg text-start text-gray-600 mt-2'>
                Limit results to repositories of the specified type.
              </p>
            </span>
            <div className='flex justify-start items-center flex-wrap gap-5 mt-5'>
              <button
                className={`group/owner flex justify-between w-fit h-14 ${filters.type.includes('owner') ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => handleFilterType('owner')}
              >
                Owner
                <UserIcon
                  className='w-6 h-6 ml-2 group-hover/owner:animate-pulse duration-150'
                />
              </button>
              <button
                className={`group/member flex justify-between w-fit h-14 ${filters.type.includes('member') ? 'bg-primary-200 text-primary-50' : 'bg-white text-primary-300'} font-bold p-4 rounded transition hover:bg-primary-200 hover:text-primary-50`}
                onClick={() => handleFilterType('member')}
              >
                Member
                <UserGroupIcon
                  className='w-6 h-6 ml-2 group-hover/member:animate-pulse duration-150'
                />
              </button>
            </div>
          </div>
          <div className='flex justify-between  items-center gap-2 h-fit w-full md:w-[90%] md:justify-end'>
            <button
              className='flex justify-between w-fit bg-transparent text-primary-300 font-medium py-2 px-6 rounded transition hover:bg-primary-50'
              onClick={clearFilters}
            >
              Clear Filters
              <ArrowUturnLeftIcon
                className='w-6 h-6 ml-2'
              />
            </button>
            <button
              className='flex justify-between w-fit bg-primary-400 text-primary-50 font-bold py-2 px-6 rounded transition hover:bg-primary-500 hover:text-primary-100'
              onClick={() => handleDownloadSvg('dark-template')}
            >
              Download
              <ArrowDownTrayIcon
                className='w-6 h-6 ml-2'
              />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
