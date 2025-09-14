import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../navbar/Navbar'

const Layout = () => {
    return (
        <div className='p-0 m-0 box-border'>
            <div className='w-screen h-screen flex items-center flex-col pt-2 pb-2 bg-neutral-900'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout