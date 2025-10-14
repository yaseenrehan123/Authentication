import React from 'react'
import ProfileDetails from './ProfileDetails'
import { useAuthStore } from '@/stores/useAuthStore'

const ProfilePage = () => {
    const loggedIn = useAuthStore((state) => state.loggedIn);
    return (
        <div className='flex items-center flex-col pt-15'>
            {!loggedIn &&
                <div className='text-4xl text-white'>
                    User not logged in
                </div>}
            {loggedIn && <ProfileDetails />}
        </div>
    )
}

export default ProfilePage