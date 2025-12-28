import { useSidebarStore } from '@/stores/useSidebarStore'
import React, { useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import ProfileIcon from './ProfileIcon';
import ColumnDivider from '../../components/ui/columnDivider';
import Navlink from '../../components/ui/navlink';
import { FaSignInAlt } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import NavCancelIcon from './NavCancelIcon';
import SidebarOverlay from './SidebarOverlay';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { MdDelete } from "react-icons/md";
import useDeleteAccountConfirmationStore from '@/stores/useDeleteAccountConfirmationStore';
import useLogout from '@/hooks/useLogout';
const Sidebar = () => {
    const enabled = useSidebarStore((state) => state.enabled);
    const loggedIn = useAuthStore((state) => state.loggedIn);
    const setEnabled = useDeleteAccountConfirmationStore((state) => state.setEnabled);
    const { mutateAsync } = useLogout();
    const navigate = useNavigate();

    const onSignButton = async () => {
        console.log("LOGGED:", loggedIn);
        if (!loggedIn) {
            console.log("NAVIGATION CODE RAN!");
            navigate('/login');
            return;
        }
        console.log("LOGOUT!");
        await mutateAsync();
    }

    const onDeleteAccountButton = () => {
        setEnabled(true);
    }

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
                            <Navlink variant='sidebar' onClick={() => onSignButton()} navigateRoute={false}>
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
                            {loggedIn && <Navlink variant='sidebar' navigateRoute={false} className={'gap-2'}
                                onClick={onDeleteAccountButton}>
                                <MdDelete className='text-red-500' /> Delete Account
                            </Navlink>}
                            <NavCancelIcon />
                        </motion.div>
                    </MotionConfig>
                </>
            )}
        </AnimatePresence>
    );
};



export default Sidebar