import type { ProfileAvatarProps } from '@/types';
import { cva } from 'class-variance-authority';
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const ProfileAvatar = ({ variant, className, username, avatarUrl, ...props }: ProfileAvatarProps) => {
    const [logoError, setLogoError] = useState<Boolean>(false);
    return (<div {...props} className={cn(variants({ variant }), className)}>
        {
            !logoError ?
                <img src={avatarUrl ?? "null"} alt="" className='rounded-full w-full h-full' onError={() => setLogoError(true)} />
                : <div className={`${variant === 'mainbar' ? 'text-2xl' : variant === 'sidebar' ? 'text-[40px]' : 'text-2xl'} text-white`}>
                    {username?.charAt(0)}
                </div>
        }

    </div >)
}
const variants = cva('w-8 h-8 rounded-full flex items-center justify-center text-center bg-black outline-2 outline-neutral-900', {
    variants: {
        variant: {
            mainbar: 'w-10 h-10',
            sidebar: 'w-20 h-20'
        }
    },
    defaultVariants: {
        variant: 'mainbar'
    }
})
export default ProfileAvatar