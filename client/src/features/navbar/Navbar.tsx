import React, { lazy, Suspense } from 'react'
import Mainbar from './Mainbar';
import { useSidebarStore } from '@/stores/useSidebarStore';

const Sidebar = lazy(() => import("./Sidebar"));

const Navbar = () => {
    const sidebarEnabled = useSidebarStore((state) => state.enabled);

    return (
        <div className='flex items-center justify-between relative'>
            <Mainbar />
            {sidebarEnabled &&
                (<Suspense fallback={null}>
                    <Sidebar />
                </Suspense>)}

        </div>
    )
}

export default Navbar