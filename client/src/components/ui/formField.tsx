import { cn } from '@/lib/utils'
import type { FormFieldProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const FormField = ({ variant, className, ...props }: FormFieldProps) => {
    return (
        <input {...props} className={cn(variants({ variant }), className)} />
    )
}

const variants = cva('text-center text-black bg-white rounded-[8px] h-8 focus:outline-2 outline-neutral-400', {
    variants: {
        variant: {
            default: 'w-[clamp(3.5rem,50vw,20rem)]',
            small: 'w-[clamp(2rem,40vw,16rem)]',
            large: 'w-[clamp(3.5rem,75vw,28rem)]'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export default FormField