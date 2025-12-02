'use client'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { supabase, hasSupabase } from '../../lib/supabase'
import { styles } from '../../utils/svgStyles'
import { useRouter } from 'next/navigation'
import TemplatePreview from '../../components/Home/TemplatePreview'
import ThemeControls from '../../components/Home/ThemeControls'
import SortControls from '../../components/Home/SortControls'
import TypeControls from '../../components/Home/TypeControls'
import { Footer } from '../../components/Footer'
import { ThemeToggle } from '../../components/ThemeToggle'
import {
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface Repo {
  id: number;
  name: string;
  description: string | null;
  homepage: string | null;
  is_template: boolean;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

interface Filters {
  theme: 'dark' | 'light';
  invertColors: boolean;
  sort: 'stars' | 'created' | 'updated' | 'full_name';
  order: 'asc' | 'desc';
  type: string[];
}

const defaultFilters: Filters = { theme: 'dark', invertColors: false, sort: 'stars', order: 'asc', type: ['owner'] } as const

async function safeFetchJson<T = any>(input: string | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

function formatRepositories(repositories: any[]): Repo[] {
  return repositories.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    homepage: item.homepage,
    is_template: item.is_template,
    language: item.language,
    stargazers_count: item.stargazers_count,
    topics: item.topics,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }))
}

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Falha ao carregar asset: ${url}`)
  const blob = await res.blob()
  return await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

export default function HomePage() {
  const auth = useContext(AuthContext)
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [info, setInfo] = useState<any>({})

  const [repositories, setRepositories] = useState<Repo[]>([])
  const [filterRepositories, setFilterRepositories] = useState<string[]>([])
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  if (!auth) return null
  const { state, dispatch } = auth

  useEffect(() => {
    if (!info?.repos_url) return
    handleApplyFilters().catch((e) => {
      console.error(e)
      toast.error(e.message)
    })
  }, [filters.sort, filters.order, filters.type])

  useEffect(() => {
    if (state.isLoading) return

    if (!state.isLoggedIn && !state.githubUsername) {
      router.replace('/')
      return
    }

    const manual = state?.githubUsername
    if (manual) {
      setUsername(manual)
      return
    }
    (async () => {
      try {
        const token = await getSession()
        if (!token) return
        const oauthName = await getOAuthUsername(token)
        if (oauthName) setUsername(oauthName)
      } catch (error: any) {
        console.error(error)
        toast.error(error.message)
      }
    })()
  }, [state?.githubUsername, state.isLoggedIn, state.isLoading, router])

  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const data = await safeFetchJson<any>('https://api.github.com/users/' + username)
        setInfo({
          bio: data.bio,
          blog: data.blog,
          company: data.company,
          followers: data.followers,
          public_repos: data.public_repos,
          repos_url: data.repos_url,
          twitter_username: data.twitter_username,
        })
      } catch (error: any) {
        console.error(error)
        toast.error(error.message)
      }
    })()
  }, [username])

  useEffect(() => {
    if (!info?.repos_url) return;
    (async () => {
      try {
        const data = await safeFetchJson<any[]>(info.repos_url)
        const ordered = data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        const formatted = formatRepositories(ordered)
        setRepositories(formatted)
        setFilterRepositories(formatted.map((i) => i.name))
      } catch (error: any) {
        console.error(error)
        toast.error(error.message)
      }
    })()
  }, [info])

  useEffect(() => {
    setFilters((prev) => ({ ...prev, invertColors: state.theme === 'dark' }))
  }, [state.theme])

  const getSession = async () => {
    try {
      if (!hasSupabase || !supabase) return null
      const { data, error } = await supabase.auth.getSession()
      if (error) throw new Error(error.message)
      return data.session?.access_token
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
      return null
    }
  }

  const getOAuthUsername = async (accessToken: string) => {
    try {
      if (!hasSupabase || !supabase) return null
      const { data, error } = await supabase.auth.getUser(accessToken)
      if (error) throw new Error(error.message)
      return (data.user.user_metadata as any).preferred_username as string
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
      return null
    }
  }

  const handleLogout = async () => {
    try {
      if (hasSupabase && supabase) {
        const { error } = await supabase.auth.signOut()
        if (error) throw new Error(error.message)
      }
      dispatch({ type: 'LOGOUT' })
      router.replace('/')
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const handleDownloadSvg = async (templateId: string) => {
    const svg = document.getElementById(templateId) as SVGSVGElement | null
    if (!svg) {
      console.error('SVG não encontrado')
      toast.error('Template não encontrado')
      return
    }

    try {
      toast.info('Preparando download...')

      const canvas = document.createElement('canvas')
      const bbox = svg.getBoundingClientRect()
      const width = bbox.width || 500
      const height = bbox.height || 650

      const scale = 2
      canvas.width = width * scale
      canvas.height = height * scale

      const clone = svg.cloneNode(true) as SVGSVGElement
      clone.setAttribute('width', String(width))
      clone.setAttribute('height', String(height))

      const ns = 'http://www.w3.org/2000/svg'
      let styleTag = clone.querySelector('style') as SVGStyleElement | null
      let defs = clone.querySelector('defs') as SVGDefsElement | null

      if (!defs) {
        defs = document.createElementNS(ns, 'defs') as SVGDefsElement
        clone.insertBefore(defs, clone.firstChild)
      }
      if (!styleTag) {
        styleTag = document.createElementNS(ns, 'style') as SVGStyleElement
        defs.appendChild(styleTag)
      }

      try {
        const [bebasDataUrl, lolaDataUrl] = await Promise.all([
          toDataUrl('/fonts/BebasKai.otf'),
          toDataUrl('/fonts/Lolapeluza.ttf'),
        ])
        let css = (styles as any).template1 as string
        css = css.replace('url(\'../fonts/BebasKai.otf\')', `url(${bebasDataUrl})`)
        css = css.replace('url(\'../fonts/Lolapeluza.ttf\')', `url(${lolaDataUrl})`)
        styleTag!.textContent = css
      } catch (e) {
        console.warn('Não foi possível embutir fontes, continuando...', e)
      }

      const serializer = new XMLSerializer()
      let source = serializer.serializeToString(clone)

      if (!source.match(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
      }
      if (!source.match(/xmlns:xlink/)) {
        source = source.replace('<svg', '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
      }

      const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(source)))

      const img = new Image()

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = (e) => {
          console.error('Erro ao carregar SVG como imagem:', e)
          reject(new Error('Falha ao carregar SVG'))
        }
        img.src = svgDataUrl
      })

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Não foi possível obter contexto do canvas')
      }

      ctx.scale(scale, scale)
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error('Erro ao gerar imagem PNG')
          return
        }

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download = 'gitfest-poster.png'
        a.href = url
        a.click()

        setTimeout(() => URL.revokeObjectURL(url), 100)
        toast.success('Download iniciado!')
      }, 'image/png', 1.0)

    } catch (error: any) {
      console.error('Erro no processo de download:', error)
      toast.error(error.message || 'Erro ao fazer download da imagem. Tente novamente.')
    }
  }

  const handleFilterType = (type: string) => {
    setFilters((prev) => {
      const exists = prev.type.includes(type)
      const next = exists ? prev.type.filter((t) => t !== type) : [...prev.type, type]
      return { ...prev, type: next.length === 0 ? ['owner'] : next }
    })
  }

  const handleApplyFilters = async () => {
    const { type, order, sort } = filters
    if (!info?.repos_url) return
    const url = new URL(info.repos_url)
    url.searchParams.set('direction', order)
    if (sort !== 'stars') url.searchParams.set('sort', sort)
    url.searchParams.set('type', type.length === 1 ? type[0] : 'all')
    let data = await safeFetchJson<any[]>(url)
    if (sort === 'stars') data = data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    const formatted = formatRepositories(data)
    setFilterRepositories(formatted.map((item) => item.name))
  }

  const clearFilters = () => setFilters(defaultFilters)

  if (!username) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-white via-primary-50/5 to-white dark:from-zinc-900 dark:via-zinc-800/30 dark:to-zinc-900 relative overflow-hidden'>
        <div className='fixed inset-0 pointer-events-none opacity-20 dark:opacity-10'>
          <div className='absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/10 via-secondary-400/5 to-primary-300/10 rounded-full blur-3xl animate-float'></div>
          <div className='absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-secondary-400/10 via-primary-300/5 to-secondary-400/10 rounded-full blur-3xl animate-float' style={{animationDelay: '3s'}}></div>
        </div>

        <main className='py-6 min-h-screen'>
          <div className='container max-w-[1600px] px-4 md:px-6 h-full'>
            <div className='mb-8 animate-pulse'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-14 h-14 rounded-2xl bg-gray-200 dark:bg-zinc-800'></div>
                  <div className='flex-1'>
                    <div className='h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-2'></div>
                    <div className='h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded'></div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl'></div>
                  <div className='w-24 h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl'></div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:h-[calc(100vh-12rem)]'>
              <div className='order-1 lg:order-1 flex items-center py-6 lg:py-0 lg:h-full'>
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='relative p-4 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 shadow-xl w-full max-w-[650px] h-full max-h-[650px] lg:max-h-full flex items-center justify-center'>
                    <div className='w-full h-[95%] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 rounded-xl animate-pulse'></div>
                  </div>
                </div>
              </div>

              <div className='space-y-3 order-2 lg:order-2 lg:h-full flex flex-col animate-pulse'>
                <div className='flex items-center gap-2.5 pb-3 border-b border-gray-200/50 dark:border-zinc-700/50 flex-shrink-0'>
                  <div className='w-9 h-9 rounded-xl bg-gray-200 dark:bg-zinc-800'></div>
                  <div className='h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded'></div>
                </div>

                <div className='flex-1 overflow-y-auto scrollbar-hide space-y-3'>
                  <div className='p-4 rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 shadow-lg h-32'></div>
                  <div className='p-4 rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 shadow-lg h-32'></div>
                  <div className='p-4 rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 shadow-lg h-32'></div>
                  <div className='p-3.5 rounded-xl bg-gradient-to-br from-primary-50/50 to-secondary-50/30 dark:from-zinc-800/80 dark:to-zinc-800/60 backdrop-blur-sm border border-primary-200/40 dark:border-zinc-700/60 h-20'></div>
                </div>

                <div className='space-y-2.5 flex-shrink-0'>
                  <div className='w-full h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl'></div>
                  <div className='w-full h-14 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-zinc-700 dark:to-zinc-800 rounded-xl'></div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-primary-50/5 to-white dark:from-zinc-900 dark:via-zinc-800/30 dark:to-zinc-900 relative overflow-hidden'>
      <div className='fixed inset-0 pointer-events-none opacity-20 dark:opacity-10'>
        <div className='absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/10 via-secondary-400/5 to-primary-300/10 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-secondary-400/10 via-primary-300/5 to-secondary-400/10 rounded-full blur-3xl animate-float' style={{animationDelay: '3s'}}></div>
        <div className='absolute top-1/2 right-1/3 w-32 h-32 border border-primary-300/20 dark:border-primary-600/20 rounded-3xl rotate-12 animate-float'></div>
      </div>

      <main className='py-6 min-h-screen'>
        <div className='container max-w-[1600px] px-4 md:px-6 h-full'>
          <div className='mb-6 md:mb-8 animate-fade-in-up'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-center gap-3 md:gap-4 flex-1 min-w-0'>
                <div className='relative group flex-shrink-0'>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse-soft'></div>
                  <div className='relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'>
                    <SparklesIcon className='w-6 h-6 md:w-7 md:h-7 text-white animate-pulse' />
                  </div>
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight animate-fade-in truncate'>
                      {username}
                    </h1>
                    <CheckCircleIcon className='w-4 h-4 md:w-5 md:h-5 text-primary-500 animate-pulse-soft flex-shrink-0' />
                  </div>
                  {info.bio ? (
                    <p className='text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-1 animate-fade-in' style={{animationDelay: '100ms'}}>
                      {info.bio}
                    </p>
                  ) : (
                    <p className='text-xs md:text-sm text-gray-600 dark:text-gray-400 animate-fade-in' style={{animationDelay: '100ms'}}>
                      Customize and download your festival poster
                    </p>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-2 flex-shrink-0'>
                <ThemeToggle />
                <button
                  className='group flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 font-semibold transition-all text-xs md:text-sm hover:scale-105 hover:shadow-lg active:scale-95 animate-fade-in'
                  onClick={handleLogout}
                  style={{animationDelay: '200ms'}}
                >
                  <span className='hidden sm:inline'>Logout</span>
                  <ArrowUturnLeftIcon className='w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300' />
                </button>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:h-[calc(100vh-12rem)]'>
            <div className='order-1 lg:order-1 flex items-center justify-center py-6 lg:py-0 lg:h-full'>
              <div className='w-full h-full max-w-[600px] mx-auto flex items-center justify-center'>
                <div className='group relative p-3 sm:p-4 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 hover:border-primary-400/40 dark:hover:border-primary-500/40 shadow-xl hover:shadow-2xl transition-all duration-700 w-full h-full max-h-[650px] lg:max-h-full flex items-center justify-center'>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
                  <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                  <div className='relative z-10 w-full h-full flex items-center justify-center'>
                    <TemplatePreview
                      username={username}
                      data={filterRepositories}
                      invertColors={filters.invertColors}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-3 animate-fade-in-up order-2 lg:order-2 lg:h-full flex flex-col' style={{ animationDelay: '50ms' }}>
              <div className='flex items-center gap-2.5 pb-3 border-b border-gray-200/50 dark:border-zinc-700/50 flex-shrink-0'>
                <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center animate-bounce-soft'>
                  <AdjustmentsHorizontalIcon className='w-5 h-5 text-primary-600 dark:text-primary-400' />
                </div>
                <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
                  Customize
                </h2>
              </div>

              <div className='flex-1 lg:overflow-y-auto scrollbar-hide space-y-3 lg:max-h-[calc(100vh-20rem)]'>

                <div className='group relative p-4 rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 hover:border-primary-300/50 dark:hover:border-primary-600/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.01] animate-fade-in-up' style={{animationDelay: '100ms'}}>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='relative z-10'>
                    <ThemeControls filters={filters} setFilters={setFilters} />
                  </div>
                </div>

                <div className='group relative p-4 rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 hover:border-secondary-300/50 dark:hover:border-secondary-600/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.01] animate-fade-in-up' style={{animationDelay: '200ms'}}>
                  <div className='absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='relative z-10'>
                    <SortControls filters={filters} setFilters={setFilters} />
                  </div>
                </div>

                <div className='group relative p-4 rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border-2 border-white/60 dark:border-zinc-700/60 hover:border-primary-300/50 dark:hover:border-primary-600/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.01] animate-fade-in-up' style={{animationDelay: '300ms'}}>
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='relative z-10'>
                    <TypeControls selected={filters.type} onToggle={handleFilterType} />
                  </div>
                </div>

                <div className='group relative p-3.5 rounded-xl bg-gradient-to-br from-primary-50/50 to-secondary-50/30 dark:from-zinc-800/80 dark:to-zinc-800/60 backdrop-blur-sm border border-primary-200/40 dark:border-zinc-700/60 overflow-hidden hover:scale-[1.02] transition-transform duration-300'>
                  <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/10 to-transparent rounded-full blur-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500'></div>

                  <div className='relative flex items-start gap-2.5'>
                    <div className='w-7 h-7 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500'>
                      <ArrowPathIcon className='w-3.5 h-3.5 text-primary-600 dark:text-primary-400 group-hover:rotate-180 transition-transform duration-700 animate-pulse-soft' />
                    </div>
                    <div className='space-y-0.5'>
                      <p className='text-xs font-bold text-gray-900 dark:text-white'>
                      Live Preview
                      </p>
                      <p className='text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed'>
                      Changes apply instantly. Download when ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-2.5 flex-shrink-0'>
                <button
                  className='group relative flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all text-xs hover:scale-105 active:scale-95 overflow-hidden border border-gray-200 dark:border-zinc-700 hover:shadow-lg'
                  onClick={clearFilters}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <ArrowUturnLeftIcon className='relative z-10 w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300' />
                  <span className='relative z-10'>Reset Filters</span>
                </button>
                <button
                  className='group relative flex items-center justify-center gap-2.5 w-full px-5 py-3.5 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 text-white font-bold rounded-xl transition-all text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 overflow-hidden'
                  onClick={() => handleDownloadSvg('dark-template')}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                  <ArrowDownTrayIcon className='relative z-10 w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300' />
                  <span className='relative z-10'>Download Poster</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
