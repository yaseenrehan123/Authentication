import { useSidebarStore } from '@/stores/useSidebarStore';
import { motion, MotionConfig } from "framer-motion";
import React from 'react'

const SidebarOverlay = () => {
    const setEnabled = useSidebarStore((state) => state.setEnabled);
    return (
        <MotionConfig transition={{ duration: 0.1, type: 'spring', bounce: 0.1 }}>
            <motion.div className="fixed inset-0 bg-black/40 z-10"
                onClick={() => setEnabled(false)}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
            />
        </MotionConfig>

    )
}

export default SidebarOverlay