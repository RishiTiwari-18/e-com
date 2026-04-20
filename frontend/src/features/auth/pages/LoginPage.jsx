import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import useAuth from '../hooks/useAuth'
import { toast } from 'sonner'
import GoogleAuthButton from '../components/GoogleAuthButton.jsx'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
        const registeredUser = await handleLogin(data)
        toast.success(registeredUser.message || 'Login successful')
        console.log(registeredUser)
        navigate('/')
    } catch (error) {
        toast.error(error.message || 'Login failed')
        console.log(error)
    }

  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google'
  }

  return (
    <main className='h-screen w-full flex items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login to your account</CardTitle>
          </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='grid w-full gap-4'>
                    <div className='grid w-full gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' type='email' placeholder='john.doe@example.com' {...register('email', { required: 'Email is required' })} />
                        {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
                    </div>
                    <div className='grid w-full gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input id='password' type='password' placeholder='••••••••' {...register('password', { required: 'Password is required' })} />
                        {errors.password && <p className='text-sm text-destructive'>{errors.password.message}</p>}
                    </div>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <div className='relative'>
                      <div className='absolute inset-0 flex items-center'>
                        <span className='w-full border-t' />
                      </div>
                      <div className='relative flex justify-center text-xs uppercase'>
                        <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
                      </div>
                    </div>
                    <GoogleAuthButton onClick={handleGoogleLogin} />
                    <p className='text-center text-sm text-muted-foreground'>
                      Don&apos;t have an account?{' '}
                      <Link to='/register' className='font-medium text-foreground underline underline-offset-4'>
                        Sign up
                      </Link>
                    </p>
                </form>
            </CardContent>

        </Card>
    </main>
  )
}

export default LoginPage