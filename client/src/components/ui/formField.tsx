import { cn } from '@/lib/utils'
import type { FormFieldProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const FormField = ({ variant, className, ...props }: FormFieldProps) => {
    return (
        <input {...props} className={cn(variants({ variant }), className)}>

        </input>
    )
}

const variants = cva('text-center text-gray-500 bg-[#232323] rounded-[8px] w-[clamp(3.5rem, 50vw, 20rem)] h-10 focus:outline-2 outline-black', {
    variants: {
        variant: {
            default: ''
        }
    }
})

export default FormField