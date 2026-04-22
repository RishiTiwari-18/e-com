import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spinner } from '@/components/ui/spinner'

function ProtectedRoute({allowedRoles}) {
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)
  const location = useLocation()

  if (loading) {
    return <div className='h-screen w-full flex items-center justify-center'><Spinner/></div>
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
