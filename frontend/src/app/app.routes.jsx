import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@/features/auth/pages/RegisterPage.jsx";
import HomePage from "@/features/home/pages/HomePage.jsx";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute.jsx";
import CreateProduct from "@/features/products/pages/CreateProduct.jsx";
import Dashboard from "@/features/products/pages/Dashboard.jsx";
import UnauthorizedPage from "@/features/system/pages/UnauthorizedPage.jsx";
import NotFoundPage from "@/features/system/pages/NotFoundPage.jsx";

const routes = createBrowserRouter([
  // Public routes
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  // Protected Routes ( any logged in user can access these routes )
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },

  // Seller Routes ( only users with seller role can access these routes )
  {
    element: <ProtectedRoute allowedRoles={["seller"]} />,
    children: [
      {
        path: "/seller",
        children: [
          {
            path: "create-product",
            element: <CreateProduct />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  // 🚫 Unauthorized fallback
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },

  // ❌ 404 fallback
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
