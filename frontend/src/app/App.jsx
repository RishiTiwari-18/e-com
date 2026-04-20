import { RouterProvider } from 'react-router-dom'
import routes from './app.routes'
import { Toaster } from '@/components/ui/sonner.jsx'
import useAuth from '@/features/auth/hooks/useAuth'
import { useEffect } from 'react'

function App() {
  const { handleGetMe } = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await handleGetMe()
      } catch (error) {
        console.log('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [])

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="bottom-right" richColors closeButton />
    </>
  )
}

export default App