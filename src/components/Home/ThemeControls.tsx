import React from 'react'

import GitFestRio from '../../assets/gitfest-rio.png'
import GitFest from '../../assets/gitfest.png'

type Filters = {
  theme: 'dark' | 'light' | 'gitfest-rio';
  invertColors: boolean;
  sort: 'stars' | 'created' | 'updated' | 'full_name';
  order: 'asc' | 'desc';
  type: string[];
};

export default function ThemeControls({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
  return (
    <div className='space-y-3'>
      <div>
        <h3 className='text-sm font-bold text-gray-900 dark:text-white mb-1'>Theme</h3>
        <p className='text-xs text-gray-600 dark:text-gray-400'>Choose your lineup style</p>
      </div>
      <div className='space-y-2'>
        <button
          className={`group relative w-full px-3 py-2 rounded-xl font-bold text-sm transition-all duration-500 overflow-hidden ${
            filters.theme === 'dark'
              ? 'shadow-[0_8px_32px_rgba(139,92,246,0.5),0_16px_64px_rgba(168,85,247,0.3),inset_0_2px_8px_rgba(255,255,255,0.2)] scale-105'
              : 'shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(139,92,246,0.4),0_16px_48px_rgba(168,85,247,0.25)] hover:scale-105'
          }`}
          style={{
            background: filters.theme === 'dark'
              ? 'linear-gradient(145deg, #2d1b4e 0%, #1a0f2e 50%, #2d1b4e 100%)'
              : 'linear-gradient(145deg, #3d2b5e 0%, #2d1b4e 50%, #3d2b5e 100%)',
            border: filters.theme === 'dark'
              ? '2px solid rgba(139, 92, 246, 0.5)'
              : '2px solid rgba(100, 116, 139, 0.3)'
          }}
          onClick={() => setFilters((prev) => ({ ...prev, theme: 'dark' }))}
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-primary-400/20 via-purple-500/20 to-secondary-200/20 transition-opacity duration-700 ${
            filters.theme === 'dark' ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
          }`} style={{ filter: 'blur(20px)' }}></div>

          <div className={`absolute -inset-1 bg-gradient-to-r from-primary-400 via-purple-500 to-secondary-200 rounded-2xl transition-opacity duration-500 ${
            filters.theme === 'dark' ? 'opacity-50 animate-pulse' : 'opacity-0 group-hover:opacity-30'
          }`} style={{ filter: 'blur(12px)', zIndex: -1 }}></div>

          <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/40'></div>

          <div className='relative z-20 flex items-center gap-2'>
            <div className={`relative w-10 h-10 flex-shrink-0 transition-all duration-500 ${
              filters.theme === 'dark' ? 'animate-pulse-soft scale-110' : 'group-hover:scale-110'
            }`}>
              <div className={`absolute -inset-2 bg-gradient-to-br from-primary-400/60 via-purple-500/60 to-secondary-200/60 transition-all duration-500 ${
                filters.theme === 'dark' ? 'blur-lg opacity-80' : 'blur-md opacity-50 group-hover:opacity-70 group-hover:blur-lg'
              }`}></div>

              <div className='relative w-full h-full flex items-center justify-center'>
                <div className={`absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-200 rounded-lg transition-all duration-500 ${
                  filters.theme === 'dark' ? 'rotate-6' : 'group-hover:rotate-6'
                }`} style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.3)'
                }}></div>

                <svg
                  className={`relative z-10 w-6 h-6 transition-transform duration-300 ${
                    filters.theme === 'dark' ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                  viewBox='0 0 24 24'
                  fill='white'
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))',
                    opacity: 0.95
                  }}
                >
                  <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
                </svg>
              </div>
            </div>

            <div className='flex-1 flex items-center justify-center'>
              <img
                src={GitFest.src}
                alt='GitFest'
                className={`h-11 w-auto object-contain transition-all duration-300 ${
                  filters.theme === 'dark'
                    ? 'drop-shadow-[0_2px_12px_rgba(139,92,246,0.7)] brightness-110'
                    : 'drop-shadow-[0_2px_6px_rgba(139,92,246,0.4)] group-hover:drop-shadow-[0_2px_12px_rgba(139,92,246,0.7)] group-hover:brightness-110'
                }`}
                style={{ filter: filters.theme === 'dark' ? 'saturate(1.1)' : 'saturate(0.9)' }}
              />
            </div>
          </div>

          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${
            filters.theme === 'dark' ? 'opacity-50' : ''
          }`}>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary-400/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
          </div>
        </button>

        <button
          className={`group relative w-full px-3 py-2 rounded-xl font-bold text-sm transition-all duration-500 overflow-hidden ${
            filters.theme === 'gitfest-rio'
              ? 'shadow-[0_8px_32px_rgba(0,194,255,0.5),0_16px_64px_rgba(0,149,255,0.3),inset_0_2px_8px_rgba(255,255,255,0.2)] scale-105'
              : 'shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(0,194,255,0.4),0_16px_48px_rgba(0,149,255,0.25)] hover:scale-105'
          }`}
          style={{
            background: filters.theme === 'gitfest-rio'
              ? 'linear-gradient(145deg, #1a1f35 0%, #0f1420 50%, #1a1f35 100%)'
              : 'linear-gradient(145deg, #2a2f45 0%, #1a1f35 50%, #2a2f45 100%)',
            border: filters.theme === 'gitfest-rio'
              ? '2px solid rgba(0, 194, 255, 0.5)'
              : '2px solid rgba(100, 116, 139, 0.3)'
          }}
          onClick={() => setFilters((prev) => ({ ...prev, theme: 'gitfest-rio' }))}
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-blue-600/20 transition-opacity duration-700 ${
            filters.theme === 'gitfest-rio' ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
          }`} style={{ filter: 'blur(20px)' }}></div>

          <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-2xl transition-opacity duration-500 ${
            filters.theme === 'gitfest-rio' ? 'opacity-50 animate-pulse' : 'opacity-0 group-hover:opacity-30'
          }`} style={{ filter: 'blur(12px)', zIndex: -1 }}></div>

          <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/40'></div>

          <div className='relative z-20 flex items-center gap-2'>
            <div className={`relative w-10 h-10 flex-shrink-0 rounded-full transition-all duration-500 ml-0.5 ${
              filters.theme === 'gitfest-rio' ? 'animate-pulse-soft' : 'group-hover:scale-110'
            }`}>
              <div className={`absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-400/60 via-blue-500/60 to-blue-700/60 transition-all duration-500 ${
                filters.theme === 'gitfest-rio' ? 'blur-lg opacity-80' : 'blur-md opacity-50 group-hover:opacity-70 group-hover:blur-lg'
              }`}></div>

              <div className='absolute inset-0 rounded-full overflow-hidden' style={{
                background: 'radial-gradient(circle at 30% 30%, #60a5fa 0%, #3b82f6 35%, #1e40af 70%, #1e3a8a 100%)',
                boxShadow: 'inset 0 -8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)'
              }}>
                <div className='absolute top-1 left-1.5 w-5 h-5 rounded-full' style={{
                  background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                  filter: 'blur(3px)'
                }}></div>

                <div className='absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-white/30 blur-sm'></div>

                <svg
                  className={`absolute inset-0 m-auto w-5 h-5 transition-transform duration-300 ${
                    filters.theme === 'gitfest-rio' ? 'scale-110 rotate-6' : 'group-hover:scale-110 group-hover:rotate-6'
                  }`}
                  fill='white'
                  viewBox='0 0 24 24'
                  style={{
                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.7))',
                    opacity: 0.95
                  }}
                >
                  <path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/>
                </svg>
              </div>
            </div>

            <div className='flex-1 flex items-center justify-center'>
              <img
                src={GitFestRio.src}
                alt='Rock in Rio'
                className={`h-11 w-auto object-contain transition-all duration-300 ${
                  filters.theme === 'gitfest-rio'
                    ? 'drop-shadow-[0_2px_12px_rgba(239,68,68,0.7)] brightness-110'
                    : 'drop-shadow-[0_2px_6px_rgba(239,68,68,0.4)] group-hover:drop-shadow-[0_2px_12px_rgba(239,68,68,0.7)] group-hover:brightness-110'
                }`}
                style={{ filter: filters.theme === 'gitfest-rio' ? 'saturate(1.1)' : 'saturate(0.9)' }}
              />
            </div>
          </div>

          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${
            filters.theme === 'gitfest-rio' ? 'opacity-50' : ''
          }`}>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
          </div>
        </button>

        {filters.theme === 'dark' && (
          <div className='pt-1'>
            <label className='group relative flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer transition-all hover:scale-105 overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
              <span className='relative z-10 text-sm font-semibold text-gray-700 dark:text-gray-300'>Invert Colors</span>
              <input
                type='checkbox'
                checked={filters.invertColors}
                onChange={() => setFilters((prev) => ({ ...prev, invertColors: !prev.invertColors }))}
                className='relative z-10 w-11 h-6 appearance-none bg-gray-300 dark:bg-zinc-600 rounded-full cursor-pointer transition-all checked:bg-gradient-to-r checked:from-primary-500 checked:to-secondary-500 shadow-inner after:content-[""] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all after:shadow-md checked:after:translate-x-5 hover:shadow-lg'
              />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
