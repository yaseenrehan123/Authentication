import { cn } from '@/lib/utils';
import type { ResponsiveProps } from '@/types';
import { cva } from 'class-variance-authority'
import React from 'react'

const Responsive = ({ display, sm, md, lg, children, className, ...props }: ResponsiveProps) => {
    return (
        <div {...props} className={cn(variants({ display, sm, md, lg }), className)}>{children}</div>
    )
}

const variants = cva('', {
    variants: {
        display: {
            block: 'block',
            inline: 'inline',
            inlineBlock: 'inline-block',
            flex: 'flex',
            inlineFlex: 'inline-flex',
            grid: 'grid',
            hidden: 'hidden'
        },
        sm: {
            default: '',
            block: 'sm:block',
            hidden: 'sm:hidden',
            flex: 'sm:flex',
            inlineBlock: 'sm:inline-block',
        },
        md: {
            default: '',
            block: 'md:block',
            hidden: 'md:hidden',
            flex: 'md:flex',
            inlineBlock: 'md:inline-block',
        },
        lg: {
            default: '',
            block: 'lg:block',
            hidden: 'lg:hidden',
            flex: 'lg:flex',
            inlineBlock: 'lg:inline-block',
        }
    },
    defaultVariants: {
        display: 'block',
        sm: 'default',
        md: 'default',
        lg: 'default'
    }
});

export default Responsive