import React, { useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface RepoCarouselProps {
  repos: string[]
  hiddenRepos: string[]
  onToggleRepo: (repo: string) => void
}

export default function RepoCarousel({ repos, hiddenRepos, onToggleRepo }: RepoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className='w-full flex items-center gap-1'>
      <button
        type='button'
        className='hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 shadow hover:bg-primary-100 dark:hover:bg-primary-900 transition disabled:opacity-40'
        onClick={() => scrollBy(-150)}
        tabIndex={-1}
        aria-label='Scroll left'
      >
        <ChevronLeftIcon className='w-5 h-5 text-primary-500' />
      </button>

      <div
        ref={scrollRef}
        className='w-full overflow-x-auto scrollbar-hide'
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className='flex flex-nowrap gap-2 min-w-fit py-2 px-1'>
          {repos.map((repo) => {
            const isHidden = hiddenRepos.includes(repo)
            return (
              <button
                key={repo}
                type='button'
                className={
                  'flex items-center rounded-full px-4 py-1 text-sm font-semibold shadow whitespace-nowrap min-w-[120px] max-w-xs group transition-all ' +
                  (isHidden
                    ? 'bg-gray-300 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 opacity-60 hover:opacity-80'
                    : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800')
                }
                style={{ userSelect: 'none' }}
                onClick={() => onToggleRepo(repo)}
                aria-pressed={!isHidden}
              >
                <span className='truncate max-w-[80px]'>{repo}</span>
              </button>
            )
          })}
        </div>
      </div>
      <button
        type='button'
        className='hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 shadow hover:bg-primary-100 dark:hover:bg-primary-900 transition disabled:opacity-40'
        onClick={() => scrollBy(150)}
        tabIndex={-1}
        aria-label='Scroll right'
      >
        <ChevronRightIcon className='w-5 h-5 text-primary-500' />
      </button>
    </div>
  )
}
