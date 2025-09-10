import { useSidebarStore } from '@/stores/useSidebarStore'
import React from 'react'

const Sidebar = () => {
    const enabled = useSidebarStore((state) => state.enabled);

    if (!enabled) return null;

    return (
        <div className='w-screen sm:w-1/2 md:w-60 h-screen bg-black z-20 fixed top-0 right-0'>

        </div>
    )
}

export default Sidebar