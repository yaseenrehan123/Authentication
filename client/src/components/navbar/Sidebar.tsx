import { useSidebarStore } from '@/stores/useSidebarStore'
import React, { useState } from 'react'
import ProfileIcon from './ProfileIcon';
import ColumnDivider from '../ui/columnDivider';
import Navlink from '../ui/navlink';
import { FaSignInAlt } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import NavCancelIcon from './NavCancelIcon';
import SidebarOverlay from './SidebarOverlay';
const Sidebar = () => {
    const enabled = useSidebarStore((state) => state.enabled);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    if (!enabled) return null;

    return (
        <div>
            <SidebarOverlay />
            <div className='w-screen sm:w-1/2 md:w-60 h-screen bg-black/80 z-20 fixed top-0 right-0 flex items-stretch flex-col
        gap-4 pt-10 pl-2 pr-2 text-center text-white overflow-y-auto sidebar'>
                <ProfileIcon variant='sidebar' username='Magstar' />
                <ColumnDivider variant='thin' />
                <Navlink variant='sidebar'> <FaSignInAlt /> {!loggedIn ? 'Sign In' : 'Sign Out'}</Navlink>
                <Navlink variant='sidebar'><RiAccountCircleLine /> Account</Navlink>
                <ColumnDivider variant='thin' />
                <Navlink variant='sidebar'><FaHome />Home</Navlink>
                <Navlink variant='sidebar'><FaInfoCircle />About</Navlink>
                <Navlink variant='sidebar'><FaPhoneAlt />Contact</Navlink>
                <NavCancelIcon />
            </div>
        </div>

    )
}

export default Sidebar