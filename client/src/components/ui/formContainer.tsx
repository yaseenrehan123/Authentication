import { cn } from '@/lib/utils'
import type { FormContainerProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const FormContainer = ({ variant, className, children, ...props }: FormContainerProps) => {
    return (
        <div className={cn(variants({ variant }), className)} {...props}>
            {children}
        </div>
    )
}

const variants = cva('flex items-center flex-col gap-8 border-2 rounded-[8px] p-6', {
    variants: {
        variant: {
            light: 'border-black bg-white',
            dark: 'border-black bg-[rgb(10,19,23)]'
        }
    },
    defaultVariants: {
        variant: 'light'
    }
})

export default FormContainer