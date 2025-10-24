import React, { useState } from 'react'
import Mainbar from './Mainbar';
import Sidebar from './Sidebar';

const Navbar = () => {
    return (
        <div className='flex items-center justify-between relative'>
            <Mainbar />
            <Sidebar />
        </div>
    )
}

export default Navbar