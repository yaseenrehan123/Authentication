import React from 'react'
import Navlink from '../ui/navlink'


const NotFoundPage = () => {
    return (
        <div className='p-0 m-0 box-border'>
            <div className='w-screen h-screen flex items-center flex-col pt-8 pb-2 bg-neutral-900 gap-5'>
                <div className='text-5xl font-bold text-white'>
                    404 Not Found
                </div>
                <Navlink to={'/'}
                    className='w-36 h-14 bg-black rounded-2xl text-white flex items-center justify-center text-center
                    text-2xl font-semibold hover:bg-neutral-800 transition-all duration-150 hover:scale-98 active:scale-95'>
                    Home
                </Navlink>
            </div>
        </div>
    )
}

export default NotFoundPage