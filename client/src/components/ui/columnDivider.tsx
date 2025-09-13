import { cn } from '@/lib/utils'
import type { ColumnDividerProps } from '@/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const ColumnDivider = ({ variant, className, ...props }: ColumnDividerProps) => {
    return (
        <div className={cn(variants({ variant }), className)} {...props}>

        </div>
    )
}

const variants = cva('w-full bg-neutral-900 rounded-2xl', {
    variants: {
        variant: {
            thin: 'h-0.5',
            medium: 'h-1',
            thick: 'h-1.5'
        }
    },
    defaultVariants: {
        variant: 'thin'
    }
})

export default ColumnDivider