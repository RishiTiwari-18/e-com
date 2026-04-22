import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  return (
    <main className='min-h-screen overflow-hidden bg-background px-6 py-10 '>
      <section className='mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col items-center justify-center gap-6 text-center'>
        <p className='text-xs font-semibold uppercase tracking-[0.35em] '>401 Error</p>
        <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>You do not have access to this page.</h1>
        <p className='max-w-xl text-sm  md:text-base'>
          This area is restricted based on your account role. Please return to a page you are allowed to access.
        </p>

        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Button asChild >
            <Link to='/'>Go Home</Link>
          </Button>
          <Button asChild variant='secondary' >
            <Link to='/login'>Back to Login</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
