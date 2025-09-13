import { useSidebarStore } from '@/stores/useSidebarStore';
import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import ProfileAvatar from '../ui/profileAvatar';
import type { ProfileAvatarProps, ProfileIconProps } from '@/types';

const ProfileIcon = ({ username, avatarUrl, ...avatarProps }: ProfileAvatarProps) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [logoError, setLogoError] = useState<boolean>(false);
    const setEnabled = useSidebarStore((state) => state.setEnabled);
    useEffect(() => {
        console.log(logoError);
    }, [logoError])
    return (
        <div className='flex items-center justify-center hover:cursor-pointer'
            onClick={() => setEnabled(true)}>
            {!loggedIn ?
                <CgProfile className={`text-white ${avatarProps.variant === "mainbar" ?
                    "text-4xl" : avatarProps.variant === "sidebar" ? "text-6xl"
                        : "text-2xl"}`} /> :
                <ProfileAvatar username={username} avatarUrl={avatarUrl} {...avatarProps} />
            }
        </div>
    )
}

export default ProfileIcon