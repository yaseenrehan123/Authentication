import React from 'react'
import Responsive from '../ui/responsive'
import Navlink from './Navlink'
import NavMenuIcon from './NavMenuIcon'

const Mainbar = () => {
    return (
        <div className='w-screen flex items-center justify-between bg-black min-h-10  pt-1.5 pb-1.5 z-10
        fixed top-0 left-0'>
            <div></div>
            <div className='flex items-center justify-center gap-4'>
                <Responsive display="hidden" md="flex"><Navlink>Home</Navlink></Responsive>
                <Responsive display="hidden" md="flex"><Navlink>About</Navlink></Responsive>
                <Responsive display="hidden" md="flex"><Navlink>Contact</Navlink></Responsive>
            </div>
            <div className='flex items-center justify-center'>
                <Responsive display='flex' md="hidden"><NavMenuIcon /></Responsive>
            </div>
        </div>
    )
}

export default Mainbar