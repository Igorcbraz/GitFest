'use client'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { animated, config, useSpring } from '@react-spring/web'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { AuthContext } from '../context/AuthContext'
import { supabase, hasSupabase } from '../lib/supabase'
import { useGitHubStats } from '../hooks/useGitHubStats'
import { fetchUserInfo } from '../service/githubApi'

import 'react-toastify/dist/ReactToastify.css'

import Preview from '../assets/images/dark-template.png'
import {
  ArrowRightIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CodeBracketIcon,
  StarIcon,
  CheckCircleIcon,
  BoltIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

import { Navbar } from '../components/Navbar'
import { Github } from '../components/Github'
import { Footer } from '../components/Footer'
import { TextAnimate, TextBlur, TextGradient, TextReveal, TextSlide, TextFade, TextRotate, TextScale, TextShimmer } from '../components/ui/text-animate'
import { ScrollVelocity } from '../components/ui/scroll-velocity'
import TestimonialsRaw from '../data/testimonials.json'

const calc = (x: number, y: number) => [-(y - window.innerHeight / 2) / 60, (x - window.innerWidth / 2) / 60, 1.02]
const trans = (x: number, y: number, s: number) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const ScrollAnimatedText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollTime = useRef(0)
  const scrollThrottle = 400
  const scrollAttempts = useRef(0)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  const words = [
    { text: 'Developers', color: 'text-primary-600 dark:text-primary-400' },
    { text: 'Enthusiasts', color: 'text-secondary-600 dark:text-secondary-400' },
    { text: 'Festival Lineups', color: 'text-primary-600 dark:text-primary-400' },
    { text: 'Sharing', color: 'text-secondary-600 dark:text-secondary-400' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (!entry.isIntersecting) {
          scrollAttempts.current = 0
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInView || !sectionRef.current) return

      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime.current

      if (timeSinceLastScroll < scrollThrottle) {
        e.preventDefault()
        return
      }

      const scrollingDown = e.deltaY > 0
      const scrollingUp = e.deltaY < 0
      const isAtTop = currentWordIndex === 0
      const isAtBottom = currentWordIndex === words.length - 1

      if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
        scrollAttempts.current++
        if (scrollAttempts.current > 1) {
          scrollAttempts.current = 0
          return
        }
      } else {
        scrollAttempts.current = 0
      }

      e.preventDefault()

      if (scrollingDown && currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1)
        lastScrollTime.current = now
      } else if (scrollingUp && currentWordIndex > 0) {
        setCurrentWordIndex(prev => prev - 1)
        lastScrollTime.current = now
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return

      if (e.key === 'ArrowDown' && currentWordIndex < words.length - 1) {
        e.preventDefault()
        setCurrentWordIndex(prev => prev + 1)
      } else if (e.key === 'ArrowUp' && currentWordIndex > 0) {
        e.preventDefault()
        setCurrentWordIndex(prev => prev - 1)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!isInView) return
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInView) return

      const isAtTop = currentWordIndex === 0
      const isAtBottom = currentWordIndex === words.length - 1
      const currentY = e.touches[0].clientY
      const swipingUp = currentY < touchStartY.current
      const swipingDown = currentY > touchStartY.current

      if ((isAtTop && swipingUp) || (isAtBottom && swipingDown)) {
        return
      }

      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isInView || !sectionRef.current) return

      touchEndY.current = e.changedTouches[0].clientY
      const swipeDistance = touchStartY.current - touchEndY.current
      const minSwipeDistance = 50

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        const now = Date.now()
        const timeSinceLastScroll = now - lastScrollTime.current

        if (timeSinceLastScroll < scrollThrottle) return

        const isAtTop = currentWordIndex === 0
        const isAtBottom = currentWordIndex === words.length - 1
        const swipingDown = swipeDistance > 0
        const swipingUp = swipeDistance < 0

        if ((isAtTop && swipingUp) || (isAtBottom && swipingDown)) {
          return
        }

        if (swipingDown && currentWordIndex < words.length - 1) {
          setCurrentWordIndex(prev => prev + 1)
          lastScrollTime.current = now
        } else if (swipingUp && currentWordIndex > 0) {
          setCurrentWordIndex(prev => prev - 1)
          lastScrollTime.current = now
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isInView, currentWordIndex, words.length])

  return (
    <section
      ref={sectionRef}
      id='scroll-section'
      className='relative h-screen bg-gradient-to-b from-transparent via-primary-50/10 to-transparent dark:from-transparent dark:via-zinc-800/30 dark:to-transparent snap-start'
    >
      <div className='h-full flex items-center justify-center overflow-hidden'>
        <div className='absolute top-0 left-1/3 w-80 h-80 bg-gradient-to-br from-secondary-200/15 to-primary-200/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-primary-200/15 to-secondary-200/10 rounded-full blur-3xl'></div>

        <div className='absolute top-1/3 right-10 w-20 h-20 border border-secondary-300/25 dark:border-secondary-600/25 rounded-lg -rotate-12'></div>
        <div className='absolute bottom-1/3 left-10 w-24 h-1 bg-gradient-to-r from-transparent via-primary-300/30 to-transparent'></div>
        <div className='absolute top-1/2 left-1/4 w-2 h-2 bg-primary-400/40 rounded-full animate-pulse-soft'></div>
        <div className='absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-secondary-400/40 rounded-full animate-pulse-soft' style={{animationDelay: '1.5s'}}></div>

        <div className='container relative z-10 text-center'>
          <div className='space-y-6'>
            <TextFade
              text='GitFest is made for'
              className='text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400'
              delay={0.3}
              once={false}
            />

            <div className='relative min-h-[150px] md:min-h-[200px] flex items-center justify-center'>
              {words.map((word, index) => {
                const isActive = index === currentWordIndex
                const isPast = index < currentWordIndex

                return (
                  <h2
                    key={index}
                    className={`absolute text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold ${word.color} pointer-events-none will-change-transform`}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `
                        scale(${isActive ? 1 : 0.85})
                        translateY(${isActive ? 0 : isPast ? -30 : 30}px)
                      `,
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {word.text}
                  </h2>
                )
              })}
            </div>

            <div className={`flex justify-center gap-2 mt-8 transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              {words.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWordIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:bg-primary-600 hover:scale-125 ${
                    index === currentWordIndex
                      ? 'w-8 bg-primary-500 animate-pulse-soft'
                      : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to ${words[index].text}`}
                />
              ))}
            </div>

            <TextFade
              text='Scroll or swipe to navigate'
              className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-4'
              delay={0.8}
              once={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: config.molasses }))
  const auth = useContext(AuthContext)
  const router = useRouter()
  const [githubUsername, setGithubUsername] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { stars, forks, watchers, loading } = useGitHubStats('Igorcbraz', 'GitFest')
  const [checkingUser, setCheckingUser] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  if (!auth) return null
  const { dispatch } = auth

  const checkUserExists = async (username: string) => {
    setCheckingUser(true)
    try {
      await fetchUserInfo(username)
      setCheckingUser(false)
      return true
    } catch (error: any) {
      setCheckingUser(false)
      const msg = String(error?.message || '').toLowerCase()
      let errMsg = 'GitHub user not found.'
      if (msg.includes('rate limit')) errMsg = 'GitHub API rate limit exceeded. Please click "Continue with GitHub" to login via OAuth.'
      toast.error(errMsg)
      return false
    }
  }

  const ALLOWED_HOSTS = new Set(['git-fest.vercel.app', 'localhost'])
  const DEFAULT_BASE_URL = 'https://git-fest.vercel.app'

  const getBaseUrl = () => {
    let base = DEFAULT_BASE_URL
    if (typeof window !== 'undefined' && window.location?.origin) {
      const { protocol, host, hostname } = window.location
      if (ALLOWED_HOSTS.has(hostname)) base = `${protocol}//${host}`
    }
    return base.replace(/\/$/, '')
  }

  const signIn = async (OAuth: boolean) => {
    try {
      if (OAuth) {
        if (!hasSupabase || !supabase) throw new Error('Login via GitHub indisponível no momento')
        const baseUrl = getBaseUrl()
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: { redirectTo: baseUrl ? `${baseUrl}/home` : undefined }
        })
        if (error) throw new Error(error.message)
        dispatch({ type: 'LOGIN', payload: { isLoggedIn: true } })
      } else {
        const userExists = await checkUserExists(githubUsername)
        if (!userExists) return
        dispatch({ type: 'LOGIN', payload: { isLoggedIn: true } })
        dispatch({ type: 'SET_GITHUB_USERNAME', payload: githubUsername })
        router.push('/home')
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const features = [
    {
      icon: <CodeBracketIcon className='w-8 h-8' />,
      title: 'Repository Showcase',
      description: 'Display your best projects with stats, languages, and stars in a visually stunning format'
    },
    {
      icon: <SparklesIcon className='w-8 h-8' />,
      title: 'Festival Theme',
      description: 'Unique festival lineup design that makes your work stand out from typical portfolios'
    },
    {
      icon: <RocketLaunchIcon className='w-8 h-8' />,
      title: 'Instant Generation',
      description: 'Generate your personalized lineup in seconds. No setup, no configuration needed'
    }
  ]

  const testimonials = JSON.parse(JSON.stringify(TestimonialsRaw))
  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-primary-50/10 to-white dark:from-zinc-900 dark:via-zinc-800/30 dark:to-zinc-900 relative overflow-hidden'>
      <div className='fixed inset-0 pointer-events-none opacity-30 dark:opacity-20'>
        <div className='absolute top-1/4 right-1/4 w-32 h-32 border border-primary-300/20 dark:border-primary-600/20 rounded-3xl rotate-12 animate-float'></div>
        <div className='absolute top-1/2 left-1/6 w-24 h-24 border border-secondary-300/20 dark:border-secondary-600/20 rounded-2xl -rotate-12 animate-float' style={{animationDelay: '2s'}}></div>
        <div className='absolute bottom-1/3 right-1/3 w-40 h-40 border border-primary-300/15 dark:border-primary-600/15 rounded-full animate-float' style={{animationDelay: '4s'}}></div>
        <div className='absolute top-3/4 left-1/3 w-28 h-28 border border-secondary-300/15 dark:border-secondary-600/15 rounded-xl rotate-45 animate-float' style={{animationDelay: '1s'}}></div>

        <svg className='absolute top-0 left-0 w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <line x1='0%' y1='20%' x2='100%' y2='15%' stroke='currentColor' strokeWidth='1' className='text-primary-300/10 dark:text-primary-600/10' />
          <line x1='0%' y1='45%' x2='100%' y2='50%' stroke='currentColor' strokeWidth='1' className='text-secondary-300/10 dark:text-secondary-600/10' />
          <line x1='0%' y1='70%' x2='100%' y2='65%' stroke='currentColor' strokeWidth='1' className='text-primary-300/10 dark:text-primary-600/10' />
          <line x1='0%' y1='85%' x2='100%' y2='90%' stroke='currentColor' strokeWidth='1' className='text-secondary-300/10 dark:text-secondary-600/10' />
        </svg>

        <div className='absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-300/8 to-transparent rounded-full blur-3xl animate-float'></div>
        <div className='absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-tl from-secondary-200/8 to-transparent rounded-full blur-3xl animate-float' style={{animationDelay: '2s'}}></div>
        <div className='absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-br from-primary-200/6 to-transparent rounded-full blur-3xl animate-float' style={{animationDelay: '4s'}}></div>
      </div>

      <Navbar />

      <section className='relative min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20 pb-8 md:pb-0'>
        <div className='absolute inset-0 opacity-20 dark:opacity-10' style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(149 117 149 / 0.12) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className='absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-b from-transparent via-white/30 to-white dark:from-transparent dark:via-zinc-900/30 dark:to-zinc-900 -z-10'></div>

        <div className='absolute top-1/4 left-10 w-20 h-20 border-2 border-primary-300/20 dark:border-primary-600/20 rounded-xl rotate-45'></div>
        <div className='absolute bottom-1/3 right-16 w-16 h-16 border-2 border-secondary-300/20 dark:border-secondary-600/20 rounded-full'></div>
        <div className='absolute top-1/2 right-1/4 w-1 h-32 bg-gradient-to-b from-primary-300/20 to-transparent'></div>
        <div className='absolute bottom-1/4 left-1/3 w-1 h-24 bg-gradient-to-t from-secondary-300/20 to-transparent'></div>

        <div className='container relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center'>

            <div className='space-y-6 md:space-y-8'>
              <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <SparklesIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400 animate-pulse' />
                <span className='text-xs sm:text-sm font-medium text-primary-700 dark:text-primary-300'>
                  Transform your GitHub profile
                </span>
              </div>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex flex-wrap items-center gap-x-4'>
                    <TextAnimate
                      text='Your Repositories,'
                      type='heading'
                      className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight'
                      delay={0.3}
                      once={false}
                    />
                  </div>
                  <div className='flex flex-wrap items-center gap-x-2 sm:gap-x-4'>
                    <TextAnimate
                      text='Reimagined as a'
                      type='heading'
                      className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight'
                      delay={0.5}
                      once={false}
                    />
                    <TextGradient
                      text='Festival Lineup'
                      as='span'
                      className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold whitespace-nowrap'
                      gradientClassName='from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400'
                      delay={0.8}
                      once={false}
                    />
                  </div>
                </div>

                <TextBlur
                  text='Showcase your coding journey with powerful visual magic'
                  className='text-base sm:text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed'
                  delay={1.2}
                  once={false}
                />
              </div>

              <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <form
                  className='flex flex-col sm:flex-row gap-3'
                  onSubmit={async (e) => {
                    e.preventDefault()
                    if (githubUsername !== '') await signIn(false)
                  }}
                >
                  <div className='relative flex-1'>
                    <input
                      ref={inputRef}
                      type='text'
                      placeholder='Enter your GitHub username'
                      className='w-full h-14 px-6 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 transition-all'
                      onChange={(e) => setGithubUsername(e.target.value)}
                      value={githubUsername}
                      disabled={checkingUser}
                    />
                  </div>
                  <button
                    type='submit'
                    className={`h-14 px-8 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 group ${
                      githubUsername === '' || checkingUser
                        ? 'bg-gray-300 dark:bg-zinc-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 hover:-translate-y-0.5'
                    }`}
                    disabled={githubUsername === '' || checkingUser}
                  >
                    {checkingUser ? (
                      <span className='animate-pulse'>Checking...</span>
                    ) : (
                      <span>Get Started</span>
                    )}
                    <ArrowRightIcon className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  </button>
                </form>

                <div className='flex items-center gap-4'>
                  <div className='h-px flex-1 bg-gray-200 dark:bg-zinc-700'></div>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>or</span>
                  <div className='h-px flex-1 bg-gray-200 dark:bg-zinc-700'></div>
                </div>

                <button
                  className={`w-full h-14 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all ${
                    hasSupabase
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 hover:-translate-y-0.5'
                      : 'bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => hasSupabase && signIn(true)}
                  disabled={!hasSupabase}
                >
                  <Github iconClassname='w-6 h-6 fill-current' />
                  <span>Continue with GitHub</span>
                </button>
              </div>

              <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 md:gap-8 pt-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className='flex items-center gap-2 hover:scale-105 transition-transform duration-300'>
                  <div className='flex -space-x-2'>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className='w-8 h-8 rounded-full bg-primary-500 border-2 border-white dark:border-zinc-900 animate-pulse-soft'
                        style={{animationDelay: `${i * 0.2}s`}}
                      />
                    ))}
                  </div>
                  <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    Join <strong className='text-gray-900 dark:text-white animate-pulse'>{loading ? '...' : `${stars}`}</strong> starred project
                  </span>
                </div>
                <div className='flex items-center gap-1 hover:scale-105 transition-transform duration-300'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} className='w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 animate-pulse-soft' style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                  <span className='ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    <strong className='text-gray-900 dark:text-white'>{loading ? '...' : watchers}</strong> watching
                  </span>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} max-h-[500px] sm:max-h-[550px] md:max-h-[600px] lg:max-h-[650px] xl:max-h-[700px] 2xl:max-h-[750px] flex items-center justify-center`}>
              <div className='absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-3xl opacity-20'></div>
              <animated.div
                onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{ transform: (props.xys as any).to(trans) }}
                className='relative h-full w-auto max-w-full'
              >
                <img
                  src={Preview.src || (Preview as any)}
                  alt='Festival lineup preview'
                  className='h-full w-auto object-contain rounded-3xl shadow-2xl border-4 border-white dark:border-zinc-800 hover:shadow-primary-500/20 transition-shadow duration-500'
                />
                <div className='absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent'></div>
              </animated.div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-spacing relative overflow-hidden pt-40 mt-20'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/10 to-transparent dark:from-transparent dark:via-zinc-800/30 dark:to-transparent -z-10'></div>
        <div className='absolute top-44 left-10 w-[500px] h-[500px] bg-gradient-to-br from-primary-500/30 via-secondary-500/20 to-primary-400/30 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-40 right-10 w-[600px] h-[600px] bg-gradient-to-tl from-secondary-400/25 via-primary-400/20 to-secondary-500/30 rounded-full blur-3xl animate-float' style={{animationDelay: '2s'}}></div>
        <div className='absolute top-20 right-1/4 w-32 h-32 border-2 border-primary-400/20 dark:border-primary-500/20 rounded-3xl rotate-12 animate-float'></div>
        <div className='absolute bottom-20 left-1/4 w-24 h-24 border-2 border-secondary-400/20 dark:border-secondary-500/20 rounded-2xl -rotate-6 animate-float' style={{animationDelay: '1s'}}></div>

        <svg className='absolute top-0 left-0 w-full h-full opacity-30' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='10%' cy='30%' r='4' fill='currentColor' className='text-primary-400 animate-pulse-soft' />
          <circle cx='90%' cy='70%' r='5' fill='currentColor' className='text-secondary-400 animate-pulse-soft' style={{animationDelay: '1s'}} />
          <circle cx='20%' cy='80%' r='3' fill='currentColor' className='text-primary-400 animate-pulse-soft' style={{animationDelay: '2s'}} />
          <circle cx='80%' cy='20%' r='4' fill='currentColor' className='text-secondary-400 animate-pulse-soft' style={{animationDelay: '1.5s'}} />
        </svg>

        <div className='container mx-auto px-4 sm:px-6 md:px-12 relative z-10'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-24'>
              <div className='inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-100/80 dark:bg-primary-900/40 backdrop-blur-sm border border-primary-200/50 dark:border-primary-700/50 mb-6 sm:mb-8 shadow-lg'>
                <SparklesIcon className='w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400 animate-pulse-soft' />
                <span className='text-xs sm:text-sm font-semibold text-primary-700 dark:text-primary-300'>
                  Discover the Benefits
                </span>
              </div>

              <h2 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight'>
                <TextFade text='Why Choose' className='text-gray-900 dark:text-white inline-block mr-2 sm:mr-4' delay={0.2} once={false} />
                <TextShimmer
                  text='GitFest'
                  className='text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-500 inline-block'
                  shimmerWidth={150}
                />
                <TextFade text='?' className='text-gray-900 dark:text-white inline-block ml-2' delay={0.4} once={false} />
              </h2>

              <TextSlide
                text='The easiest way to showcase your coding journey with style'
                className='text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4'
                direction='up'
                delay={0.5}
                once={false}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 relative'>
              {features.map((feature, index) => {
                const delays = ['0s', '0.2s', '0.4s']
                const hoverColors = [
                  'hover:border-primary-400/60 dark:hover:border-primary-500/60',
                  'hover:border-secondary-400/60 dark:hover:border-secondary-500/60',
                  'hover:border-primary-400/60 dark:hover:border-primary-500/60'
                ]
                const gradients = [
                  'from-primary-500/20 to-primary-600/10',
                  'from-secondary-500/20 to-secondary-600/10',
                  'from-primary-500/20 to-primary-600/10'
                ]

                return (
                  <div
                    key={index}
                    className='group opacity-0 translate-y-8 animate-fade-in-up'
                    style={{
                      animationDelay: delays[index],
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className={`relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 ${hoverColors[index]} transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl shadow-lg overflow-hidden`}>

                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                      <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-700'></div>

                      <div className='relative z-10'>
                        <div className='relative mb-8'>
                          <div className='absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500'></div>

                          <div className='relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'>
                            {feature.icon}
                          </div>

                          <div className='absolute -top-1 -right-1 w-6 h-6 bg-secondary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity'></div>
                        </div>

                        <TextScale
                          text={feature.title}
                          className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-500'
                          delay={parseFloat(delays[index])}
                          once={false}
                        />

                        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-center group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500'>
                          {feature.description}
                        </p>

                        <div className='mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0'>
                          <div className='flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400'>
                            <span>Learn more</span>
                            <ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                          </div>
                        </div>
                      </div>

                      <div className='absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500'></div>
                      <div className='absolute bottom-4 left-4 w-2 h-2 bg-secondary-500 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500'></div>

                      <div className='absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className='mt-12 sm:mt-16 md:mt-20 text-center'>
              <div className='inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 backdrop-blur-sm border border-primary-300/30 dark:border-primary-600/30 hover:scale-105 transition-all duration-300 animate-bounce-soft'>
                <CheckCircleIcon className='w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400 animate-pulse' />
                <span className='text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                  {loading ? 'Loading...' : `${stars} GitHub stars • ${forks} forks • Open source`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='relative -my-32'>
        <ScrollAnimatedText />
      </div>

      <section className='py-32 relative overflow-hidden -mt-32'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-transparent dark:from-transparent dark:via-zinc-900/15 dark:to-transparent'></div>
        <ScrollVelocity
          baseVelocity={3}
          className='text-6xl md:text-8xl font-extrabold text-gray-100 dark:text-zinc-800 py-3'
        >
          • DEVELOPERS • ENTHUSIASTS • CREATORS • INNOVATORS •
        </ScrollVelocity>
      </section>

      <section className='section-spacing relative overflow-hidden -mt-40'>
        <div className='absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-secondary-400/20 via-primary-400/15 to-secondary-500/20 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-tl from-primary-400/25 via-secondary-400/15 to-primary-500/25 rounded-full blur-3xl animate-float' style={{animationDelay: '3s'}}></div>

        <div className='absolute top-20 left-1/4 w-28 h-28 border-2 border-secondary-400/15 dark:border-secondary-500/15 rounded-3xl -rotate-12 animate-float'></div>
        <div className='absolute bottom-20 right-1/4 w-32 h-32 border-2 border-primary-400/15 dark:border-primary-500/15 rounded-2xl rotate-12 animate-float' style={{animationDelay: '2s'}}></div>

        <svg className='absolute top-0 left-0 w-full h-full opacity-20' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='15%' cy='25%' r='4' fill='currentColor' className='text-secondary-400 animate-pulse-soft' />
          <circle cx='85%' cy='75%' r='5' fill='currentColor' className='text-primary-400 animate-pulse-soft' style={{animationDelay: '1.5s'}} />
          <circle cx='30%' cy='80%' r='3' fill='currentColor' className='text-secondary-400 animate-pulse-soft' style={{animationDelay: '2.5s'}} />
          <line x1='70%' y1='15%' x2='80%' y2='25%' stroke='currentColor' strokeWidth='2' className='text-primary-400/30' />
        </svg>

        <div className='container mx-auto px-6 md:px-12 relative z-10 mb-16'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-12'>
              <div className='inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-secondary-100/80 dark:bg-secondary-900/40 backdrop-blur-sm border border-secondary-200/50 dark:border-secondary-700/50 mb-6 sm:mb-8 shadow-lg animate-bounce-soft'>
                <HeartIcon className='w-4 h-4 sm:w-5 sm:h-5 text-secondary-600 dark:text-secondary-400 animate-pulse-soft' />
                <span className='text-xs sm:text-sm font-semibold text-secondary-700 dark:text-secondary-300'>
                  Real Testimonials
                </span>
              </div>

              <h2 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight'>
                <TextFade text='Loved by' className='text-gray-900 dark:text-white inline-block mr-2 sm:mr-4' delay={0.2} once={false} />
                <TextRotate
                  text='Developers'
                  className='text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 via-primary-600 to-secondary-700 dark:from-secondary-400 dark:via-primary-400 dark:to-secondary-500 inline-block'
                  delay={0.4}
                  once={false}
                />
              </h2>

              <TextBlur
                text='See what developers are saying about GitFest'
                className='text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4'
                delay={0.5}
                once={false}
              />
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent z-10 pointer-events-none'></div>
          <div className='absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent z-10 pointer-events-none'></div>

          <div className='space-y-6 pb-8'>
            <div className='flex gap-4 md:gap-6 animate-scroll-left'>
              {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
                <div
                  key={`top-${index}`}
                  className='flex-shrink-0 w-[260px] sm:w-[320px] md:w-[400px] group'
                >
                  <div className='relative h-full p-4 sm:p-6 md:p-8 rounded-xl md:rounded-3xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 hover:border-secondary-400/60 dark:hover:border-secondary-500/60 transition-all duration-700 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl overflow-hidden'>
                    <div className={'absolute inset-0 bg-gradient-to-br from-secondary-500/10 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700'}></div>

                    <div className='absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-secondary-400/20 to-transparent rounded-full blur-2xl group-hover:w-24 group-hover:h-24 sm:group-hover:w-36 sm:group-hover:h-36 transition-all duration-700'></div>

                    <div className='absolute top-3 left-3 sm:top-5 sm:left-5 text-4xl sm:text-5xl md:text-7xl text-secondary-200 dark:text-secondary-800/50 font-serif leading-none pointer-events-none'>"</div>

                    <div className='relative z-10 pt-5 sm:pt-7'>
                      <p className='text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 leading-snug sm:leading-relaxed mb-4 sm:mb-6 md:mb-8 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-500'>
                        {testimonial.content}
                      </p>

                      <div className='flex items-center gap-2 sm:gap-3'>
                        <div className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          {testimonial.avatar}
                          <div className='absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        </div>
                        <div>
                          <h4 className='font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-500'>
                            {testimonial.name}
                          </h4>
                          <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500'>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='absolute top-4 right-4 w-2 h-2 bg-secondary-500 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500'></div>
                    <div className='absolute bottom-4 left-4 w-2 h-2 bg-primary-500 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500'></div>

                    <div className='absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex gap-4 md:gap-6 animate-scroll-right'>
              {[...testimonials.slice(3), ...testimonials.slice(3), ...testimonials.slice(3)].map((testimonial, index) => (
                <div
                  key={`bottom-${index}`}
                  className='flex-shrink-0 w-[260px] sm:w-[320px] md:w-[400px] group'
                >
                  <div className='relative h-full p-4 sm:p-6 md:p-8 rounded-xl md:rounded-3xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 hover:border-primary-400/60 dark:hover:border-primary-500/60 transition-all duration-700 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl overflow-hidden'>
                    <div className={'absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700'}></div>

                    <div className='absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-2xl group-hover:w-24 group-hover:h-24 sm:group-hover:w-36 sm:group-hover:h-36 transition-all duration-700'></div>

                    <div className='absolute top-3 left-3 sm:top-5 sm:left-5 text-4xl sm:text-5xl md:text-7xl text-primary-200 dark:text-primary-800/50 font-serif leading-none pointer-events-none'>"</div>

                    <div className='relative z-10 pt-5 sm:pt-7'>
                      <p className='text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 leading-snug sm:leading-relaxed mb-4 sm:mb-6 md:mb-8 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-500'>
                        {testimonial.content}
                      </p>

                      <div className='flex items-center gap-2 sm:gap-3'>
                        <div className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          {testimonial.avatar}
                          <div className='absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        </div>
                        <div>
                          <h4 className='font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-500'>
                            {testimonial.name}
                          </h4>
                          <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500'>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500'></div>
                    <div className='absolute bottom-4 left-4 w-2 h-2 bg-secondary-500 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500'></div>

                    <div className='absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='section-spacing relative overflow-hidden -mt-20 pt-32'>
        <div className='absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/30 via-primary-400/20 to-secondary-500/25 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-primary-400/25 via-secondary-400/15 to-primary-500/25 rounded-full blur-3xl animate-float' style={{animationDelay: '2s'}}></div>

        <div className='absolute top-10 left-10 w-24 h-24 border-2 border-primary-400/20 dark:border-primary-500/20 rounded-3xl rotate-12 animate-float'></div>
        <div className='absolute bottom-20 right-20 w-20 h-20 border-2 border-primary-400/20 dark:border-primary-500/20 rounded-2xl -rotate-6 animate-float' style={{animationDelay: '1s'}}></div>
        <div className='absolute top-1/3 right-1/4 w-3 h-3 bg-primary-500/60 rounded-full animate-pulse-soft'></div>
        <div className='absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary-500/50 rounded-full animate-bounce-soft'></div>

        <svg className='absolute top-0 left-0 w-full h-full opacity-20' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='20%' cy='30%' r='5' fill='currentColor' className='text-primary-400 animate-pulse-soft' />
          <circle cx='80%' cy='70%' r='6' fill='currentColor' className='text-primary-400 animate-pulse-soft' style={{animationDelay: '1s'}} />
          <circle cx='50%' cy='15%' r='4' fill='currentColor' className='text-secondary-400 animate-pulse-soft' style={{animationDelay: '2s'}} />
          <line x1='60%' y1='20%' x2='70%' y2='30%' stroke='currentColor' strokeWidth='2' className='text-primary-400/40' />
        </svg>

        <div className='container relative z-10'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-100/80 dark:bg-primary-900/40 backdrop-blur-sm border border-primary-200/50 dark:border-primary-700/50 mb-6 sm:mb-8 shadow-lg animate-bounce-soft'>
                <RocketLaunchIcon className='w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400 animate-pulse-soft' />
                <span className='text-xs sm:text-sm font-semibold text-primary-700 dark:text-primary-300'>
                  Join the Community
                </span>
              </div>

              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4'>
                <TextSlide
                  text='Ready to showcase'
                  className='text-gray-900 dark:text-white inline-block'
                  direction='up'
                  once={false}
                />
                <br />
                <TextReveal
                  text='your code?'
                  className='text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 dark:from-primary-400 dark:via-primary-300 dark:to-secondary-400 inline-block'
                  delay={0.3}
                  once={false}
                />
              </h2>

              <TextBlur
                text='Join thousands of developers sharing their journey'
                className='text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4'
                delay={0.6}
                once={false}
              />
            </div>

            <div className='relative group max-w-5xl mx-auto'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary-500/30 via-primary-400/20 to-secondary-500/30 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse-soft'></div>

              <div className='relative rounded-[3rem] bg-white/60 dark:bg-zinc-800/60 backdrop-blur-2xl border-2 border-white/70 dark:border-zinc-700/70 shadow-2xl overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/60 to-transparent'></div>
                <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/60 to-transparent'></div>

                <div className='p-6 sm:p-10 md:p-16'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
                    {[
                      {
                        icon: <CodeBracketIcon className='w-6 h-6' />,
                        title: 'Simple',
                        description: 'Just enter your GitHub username'
                      },
                      {
                        icon: <SparklesIcon className='w-6 h-6' />,
                        title: 'Beautiful',
                        description: 'Stunning festival-style design'
                      },
                      {
                        icon: <HeartIcon className='w-6 h-6' />,
                        title: 'Free Forever',
                        description: 'No hidden costs, ever'
                      }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className='flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 dark:bg-zinc-800/40 backdrop-blur-sm border border-white/50 dark:border-zinc-700/50 hover:border-primary-400/60 dark:hover:border-primary-500/60 transition-all duration-500 hover:scale-105 hover:shadow-xl group/card opacity-0 animate-fade-in-up'
                        style={{
                          animationDelay: `${index * 0.15}s`,
                          animationFillMode: 'forwards'
                        }}
                      >
                        <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg mb-3 sm:mb-4 group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-500'>
                          {item.icon}
                        </div>
                        <TextScale
                          text={item.title}
                          className='text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400 transition-colors'
                          delay={index * 0.15 + 0.2}
                          once={false}
                        />
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className='text-center space-y-6'>
                    <div className='max-w-md mx-auto space-y-4'>
                      <button
                        onClick={() => {
                          const section = document.querySelector('section')
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            setTimeout(() => {
                              const input = document.querySelector('input[type="text"]') as HTMLInputElement
                              if (input) {
                                input.focus()
                              }
                            }, 800)
                          }
                        }}
                        className='group relative w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 hover:from-primary-700 hover:via-primary-600 hover:to-primary-700 text-white font-bold text-lg sm:text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-xl shadow-primary-500/40 hover:shadow-primary-500/60 overflow-hidden'
                      >
                        <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                        <span className='relative z-10'>Create Your Lineup</span>
                        <RocketLaunchIcon className='relative z-10 w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300' />
                      </button>

                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        No signup required • Takes less than 30 seconds
                      </p>
                    </div>

                    <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-zinc-700/50'>
                      <div className='flex items-center gap-1.5 sm:gap-2 hover:scale-110 transition-transform duration-300'>
                        <BoltIcon className='w-4 h-4 sm:w-5 sm:h-5 text-primary-500 animate-pulse' />
                        <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Instant generation</span>
                      </div>
                      <div className='flex items-center gap-1.5 sm:gap-2 hover:scale-110 transition-transform duration-300'>
                        <CheckCircleIcon className='w-4 h-4 sm:w-5 sm:h-5 text-primary-500 animate-pulse-soft' />
                        <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Always free</span>
                      </div>
                      <div className='flex items-center gap-1.5 sm:gap-2 hover:scale-110 transition-transform duration-300'>
                        <StarIcon className='w-4 h-4 sm:w-5 sm:h-5 text-primary-500 fill-current animate-pulse-soft' />
                        <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Loved by developers</span>
                      </div>
                    </div>

                    <div className='pt-4 sm:pt-6'>
                      <div className='flex items-center justify-center gap-2 sm:gap-3'>
                        <div className='flex -space-x-1.5 sm:-space-x-2'>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 sm:border-3 border-white dark:border-zinc-800 animate-pulse-soft'
                              style={{animationDelay: `${i * 0.1}s`}}
                            />
                          ))}
                        </div>
                        <div className='text-left'>
                          <p className='text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                            {loading ? (
                              <strong className='text-primary-600 dark:text-primary-400'>Loading...</strong>
                            ) : (
                              <>
                                <strong className='text-primary-600 dark:text-primary-400'>{stars}</strong> GitHub stars
                              </>
                            )}
                          </p>
                          <p className='text-[10px] sm:text-xs text-gray-500 dark:text-gray-400'>
                            {loading ? 'fetching data...' : `${watchers} watching • ${forks} forks`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
