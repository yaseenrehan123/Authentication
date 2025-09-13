import { useSidebarStore } from '@/stores/useSidebarStore';
import React from 'react'
import { RxCross2 } from "react-icons/rx";

const NavCancelIcon = () => {
    const setEnabled = useSidebarStore((state) => state.setEnabled);
    return (
        <div className='flex items-center justify-center text-gray-500 hover:text-gray-800 duration-150 transition-all
        hover:cursor-pointer absolute top-0 left-0 text-6xl'
            onClick={() => setEnabled(false)}>
            <RxCross2 />
        </div>
    )
}

export default NavCancelIcon