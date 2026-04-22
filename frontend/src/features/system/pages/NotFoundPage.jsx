import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <main className='relative min-h-screen overflow-hidden bg-background px-6 py-10'>
      <section className='relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col items-center justify-center gap-6 text-center'>
        <p className='text-xs font-semibold uppercase tracking-[0.35em] text-stone-500'>404 Error</p>
        <h1 className='text-6xl leading-none font-semibold tracking-tight text-stone-900 md:text-8xl'>404</h1>
        <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>Page not found</h2>
        <p className='max-w-xl text-sm text-stone-600 md:text-base'>
          The page you are looking for does not exist or may have been moved.
        </p>

        <Button asChild >
          <Link to='/'>Return Home</Link>
        </Button>
      </section>
    </main>
  )
}
