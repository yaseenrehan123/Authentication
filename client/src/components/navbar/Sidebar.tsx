import { useSidebarStore } from '@/stores/useSidebarStore'
import React, { useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
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

    return (
        <AnimatePresence>
            {enabled && (
                <>
                    <SidebarOverlay />
                    <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}>
                        <motion.div
                            className='w-screen sm:w-1/2 md:w-60 h-screen bg-black/80 z-20 fixed top-0 right-0 flex items-stretch flex-col
                gap-4 pt-10 pl-2 pr-2 text-center text-white overflow-y-auto sidebar'
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                        >
                            <ProfileIcon variant='sidebar' username='Magstar' />
                            <ColumnDivider variant='thin' />
                            <Navlink variant='sidebar' to={!loggedIn ? '' : '/signup'}>
                                <FaSignInAlt /> {!loggedIn ? 'Sign In' : 'Sign Out'}
                            </Navlink>
                            <Navlink variant='sidebar' to={'/profile'}>
                                <RiAccountCircleLine /> Profile
                            </Navlink>
                            <ColumnDivider variant='thin' />
                            <Navlink variant='sidebar' to={'/'}>
                                <FaHome />Home
                            </Navlink>
                            <Navlink variant='sidebar' to={'/about'}>
                                <FaInfoCircle />About
                            </Navlink>
                            <Navlink variant='sidebar' to={'/contact'}>
                                <FaPhoneAlt />Contact
                            </Navlink>
                            <NavCancelIcon />
                        </motion.div>
                    </MotionConfig>
                </>
            )}
        </AnimatePresence>
    );
};



export default Sidebar