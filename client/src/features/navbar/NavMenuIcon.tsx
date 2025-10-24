import { useSidebarStore } from '@/stores/useSidebarStore';
import React from 'react'
import { MdOutlineMenu } from "react-icons/md";
const NavMenuIcon = () => {
    const setEnabled = useSidebarStore((state) => state.setEnabled);
    return (
        <div className='flex items-center justify-center text-[40px] text-cyan-500 hover:cursor-pointer hover:text-cyan-700
            duration-150 transition-all'
            onClick={() => setEnabled(true)}>
            <MdOutlineMenu />
        </div>
    )
}

export default NavMenuIcon