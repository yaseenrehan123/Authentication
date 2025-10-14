import { cn } from '@/lib/utils'
import type { FormFieldProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const FormField = ({ variant, bg, className, ...props }: FormFieldProps) => {
    return (
        <input {...props} className={cn(variants({ variant, bg }), className)} />
    )
}

const variants = cva('text-center rounded-[8px] h-8 focus:outline-2 outline-neutral-400', {
    variants: {
        variant: {
            default: 'w-[clamp(3.5rem,50vw,20rem)]',
            small: 'w-[clamp(2rem,40vw,16rem)]',
            large: 'w-[clamp(3.5rem,75vw,28rem)]'
        },
        bg: {
            light: 'bg-white text-black',
            dark: 'bg-gray-950 text-white'
        }
    },
    defaultVariants: {
        variant: 'default',
        bg: 'light'
    }
})

export default FormField