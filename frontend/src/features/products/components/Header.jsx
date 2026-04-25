import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
      const user = useSelector((state) => state.auth.user)
      const profileHref = user?.role === 'seller' ? '/seller/dashboard' : '/'
      const avatarSrc = user?.avatar || ''
      const userName = user?.fullname || 'User'
      const userInitial = userName.trim().charAt(0).toUpperCase()

  return (
      <header className='sticky top-0 z-20 border-b border-border/60 bg-background/90 backdrop-blur'>
        <div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6'>
          <Link to='/' className='font-newsreader text-secondary text-xl  '>
            SNITCH
          </Link>

          <nav className='flex items-center gap-2'>
            {user ? (
              <>
                <span className='hidden text-sm text-muted-foreground sm:block'>
                  Hi, {user?.fullname || 'User'}
                </span>
                <Link to={profileHref} className='rounded-full outline-none ring-ring/50 focus-visible:ring-2'>
                  <Avatar size='lg' className='border border-border/70'>
                    <AvatarImage src={avatarSrc} alt={userName} />
                    <AvatarFallback>{userInitial || 'U'}</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <>
                <Button asChild variant='ghost' className='rounded-full px-5'>
                  <Link to='/login'>Login</Link>
                </Button>
                <Button asChild className='rounded-full px-5'>
                  <Link to='/register'>Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
  )
}
