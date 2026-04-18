import { RouterProvider } from 'react-router-dom'
import routes from './app.routes'
import { Toaster } from '@/components/ui/sonner.jsx'

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="bottom-right" richColors closeButton />
    </>
  )
}

export default App