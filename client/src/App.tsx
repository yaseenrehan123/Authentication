import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppFallback from './app/AppFallback';

const query = new QueryClient();

const Layout = lazy(() => import('./app/Layout'))
const NotFoundPage = lazy(() => import("./app/NotFoundPage"))
const SignupPage = lazy(() => import('./features/signup/SignupPage'));
const LoginPage = lazy(() => import('./features/login/LoginPage'));
const VerifyPage = lazy(() => import('./features/verify/VerifyPage'));
const ProfilePage = lazy(() => import('./features/profile/ProfilePage'));
const ForgotPasswordPage = lazy(() => import("./features/forgot-password/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./features/reset-password/ResetPasswordPage"));

const App = () => {

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
      <Suspense fallback={<AppFallback />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </QueryClientProvider>

  )
}

export default App