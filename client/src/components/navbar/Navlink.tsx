import React from 'react'

const Navlink = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='text-2xl font-bold text-white hover:text-cyan-500 transition-all duration-150
        hover:cursor-pointer'>
            {children}
        </div>
    )
}

export default Navlink