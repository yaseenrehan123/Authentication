import { cn } from '@/lib/utils'
import type { MessageProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const Message = ({ variant, children, className, ...props }: MessageProps) => {
    return (
        <div className={cn(variants({ variant }), className)} {...props}>
            {children}
        </div>
    )
}

const variants = cva('text-left font-roboto', {
    variants: {
        variant: {
            default: 'text-white',
            success: 'text-green-500',
            loading: 'text-yellow-500',
            error: 'text-red-500'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export default Message