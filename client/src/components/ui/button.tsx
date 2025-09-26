import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const Button = ({ variant, children, className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={cn(variants({ variant }), className)}>
            {children}
        </button>
    )
}

const variants = cva('text-center flex items-center justify-center hover:cursor-pointer transition-all duration-150', {
    variants: {
        variant: {
            default: 'w-26 h-12 rounded-[8px] bg-white text-black hover:scale-98 hover:opacity-90 font-roboto'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export default Button