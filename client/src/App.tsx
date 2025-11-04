import React from 'react'
import Navbar from './features/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from './app/Layout'
import NotFoundPage from './app/NotFoundPage'
import SignupPage from './features/signup/SignupPage'
import LoginPage from './features/login/LoginPage';
import VerifyPage from './features/verify/VerifyPage';
import ProfilePage from './features/profile/ProfilePage';
import ForgotPasswordPage from './features/forgot-password/ForgotPasswordPage';
import ResetPasswordPage from './features/reset-password/ResetPasswordPage';

const App = () => {
  const query = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { path: 'signup', element: <SignupPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'verify', element: <VerifyPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'reset-password', element: <ResetPasswordPage /> }
      ]
    }
  ])
  return (
    <QueryClientProvider client={query}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>

  )
}

export default App