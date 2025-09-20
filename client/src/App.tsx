import React from 'react'
import Navbar from './components/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from './components/app/Layout'
import NotFoundPage from './components/app/NotFoundPage'
import SignupPage from './features/signup/SignupPage'

const App = () => {
  const query = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { path: 'signup', element: <SignupPage /> }
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