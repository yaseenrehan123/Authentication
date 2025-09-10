import type { HTMLAttributes } from "react";

//SHADCN VARIANTS
export type ResponsiveVariants = {
    display?: 'block' | 'inline' | 'inlineBlock' | 'flex' | 'inlineFlex' | 'grid' | 'hidden',
    sm?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
    md?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
    lg?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
}
//SHADCN PROPS
export type ResponsiveProps = React.HTMLAttributes<HTMLDivElement> & ResponsiveVariants;
//STORES
export type SidebarStore = {
    enabled: boolean,
    setEnabled: (newVal: boolean) => void
}