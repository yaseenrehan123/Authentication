import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../features/navbar/Navbar'
import useAutoAuth from '@/hooks/useAutoAuth'
import { useAuthStore } from '@/stores/useAuthStore'
import useFetchProfile from '@/hooks/useFetchProfile'
import DeleteAccountConfirmation from '@/features/delete-account-popup/DeleteAccountConfirmation'

const Layout = () => {
    useAutoAuth();
    useFetchProfile();
    const loggedIn = useAuthStore((state) => state.loggedIn);
    const accessToken = useAuthStore((state) => state.accessToken);
    const refreshToken = useAuthStore((state) => state.refreshToken);

    useEffect(() => {
        console.log("LOGGED IN: ", loggedIn);
        console.log("ACCESS TOKEN:", accessToken);
        console.log("REFRESH TOKEN:", refreshToken);

    }, [loggedIn, accessToken]);

    return (
        <div className='p-0 m-0 box-border'>
            <div className='w-screen h-screen flex items-center flex-col pt-2 pb-2 bg-neutral-900'>
                <Navbar />
                <DeleteAccountConfirmation />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout