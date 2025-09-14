import { cn } from '@/lib/utils'
import type { NavlinkProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'
import { NavLink } from 'react-router'

const Navlink = ({ variant, className, children, to = '', ...props }: NavlinkProps) => {
    return (
        <NavLink to={to}>
            <div className={cn(variants({ variant }), className)} {...props}>
                {children}
            </div>
        </NavLink>

    )
}

const variants = cva('text-2xl text-white font-bold hover:cursor-pointer duration-150 transition-all', {
    variants: {
        variant: {
            mainbar: 'hover:text-cyan-500',
            sidebar: 'hover:bg-neutral-800 p-2 active:scale-98 flex items-center gap-5'
        }
    },
    defaultVariants: {
        variant: 'mainbar'
    }
})

export default Navlink