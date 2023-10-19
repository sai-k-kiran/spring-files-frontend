import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react'
import Login from './components/Auth/login.jsx'
import AuthProvider from './components/context/authContext.jsx'
import ProtectedRoutes from './components/shared/ProtectedRoutes.jsx'
import Register from './components/Auth/register.jsx'
const {ToastContainer} = createStandaloneToast()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "dashboard",
    element: <ProtectedRoutes>
      <App />
    </ProtectedRoutes>
  },
  {
    path: "/register",
    element: <Register />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer/>
    </ChakraProvider>
  </React.StrictMode>
)
