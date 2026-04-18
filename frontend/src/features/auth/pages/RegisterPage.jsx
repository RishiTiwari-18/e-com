import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import useAuth from '../hooks/useAuth'
import { toast } from 'sonner'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      contact: '',
      password: '',
    },
  })

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
        const registeredUser = await handleRegister(data)
        toast.success(registeredUser.message || 'Registration successful')
        console.log(registeredUser)
        navigate('/')
    } catch (error) {
        toast.error(error.message || 'Registration failed')
        console.log(error)
    }

  }

  return (
    <main className='h-screen w-full flex items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-2xl'>Create an account</CardTitle>
          </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='grid w-full gap-4'>
                    <div className='grid w-full gap-2'>
                        <Label htmlFor='fullname'>Full Name</Label>
                        <Input id='fullname' placeholder='John Doe' {...register('fullname', { required: 'Full name is required' })} />
                        {errors.fullname && <p className='text-sm text-destructive'>{errors.fullname.message}</p>}
                    </div>
                    <div className='grid w-full gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' type='email' placeholder='john.doe@example.com' {...register('email', { required: 'Email is required' })} />
                        {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
                    </div>
                    <div className='grid w-full gap-2'>
                        <Label htmlFor='contact'>Contact</Label>
                        <Input id='contact' placeholder='123-456-7890' {...register('contact', { required: 'Contact is required' })} />
                        {errors.contact && <p className='text-sm text-destructive'>{errors.contact.message}</p>}
                    </div>
                    <div className='grid w-full gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input id='password' type='password' placeholder='••••••••' {...register('password', { required: 'Password is required' })} />
                        {errors.password && <p className='text-sm text-destructive'>{errors.password.message}</p>}
                    </div>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>
            </CardContent>

        </Card>
    </main>
  )
}

export default RegisterPage