import { Navigate, createBrowserRouter } from 'react-router-dom'
import RegisterPage from '@/features/auth/pages/RegisterPage.jsx'
import HomePage from '@/features/home/pages/HomePage.jsx'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage/>,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
])

export default routes