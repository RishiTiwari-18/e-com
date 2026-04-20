import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '@/features/auth/pages/RegisterPage.jsx'
import HomePage from '@/features/home/pages/HomePage.jsx'
import LoginPage from '@/features/auth/pages/LoginPage'
import ProtectedRoute from '@/features/auth/components/ProtectedRoute.jsx'
import CreateProduct from '@/features/products/pages/CreateProduct.jsx'
import ProductsPage from '@/features/products/pages/ProductsPage.jsx'

const routes = createBrowserRouter([
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/products',
				element: <ProductsPage />,
			},
			{
				path: '/products/create',
				element: <CreateProduct />,
			},
		],
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
	{
		path: '/login',
		element: <LoginPage />
	}
])

export default routes