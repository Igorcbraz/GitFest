export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-primary-50/5 to-white dark:from-zinc-900 dark:via-zinc-800/30 dark:to-zinc-900'>
      <div className='flex flex-col items-center gap-4'>
        <span className='text-6xl font-bold text-primary-500 dark:text-primary-400'>404</span>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Page Not Found</h1>
        <p className='text-gray-600 dark:text-gray-400 text-center max-w-xs'>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <a href='/' className='mt-2 px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg transition-all text-sm'>
          Go to Home
        </a>
      </div>
    </div>
  )
}
