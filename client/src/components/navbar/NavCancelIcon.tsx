import { useSidebarStore } from '@/stores/useSidebarStore';
import React from 'react'
import { RxCross2 } from "react-icons/rx";

const NavCancelIcon = () => {
    const setEnabled = useSidebarStore((state) => state.setEnabled);
    return (
        <div className='flex items-center justify-center text-red-500 hover:text-red-800 duration-150 transition-all
        hover:cursor-pointer'
            onClick={() => setEnabled(false)}>
            <RxCross2 />
        </div>
    )
}

export default NavCancelIcon