import { useSidebarStore } from '@/stores/useSidebarStore';
import React from 'react'

const SidebarOverlay = () => {
    const setEnabled = useSidebarStore((state) => state.setEnabled);
    return (
        <div className="fixed inset-0 bg-black/40 z-10"
            onClick={() => setEnabled(false)}
        />
    )
}

export default SidebarOverlay