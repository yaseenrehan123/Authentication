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
export type ProfileAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'sidebar' | 'mainbar',
    username?: string,
    avatarUrl?: string
}
export type ColumnDividerProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'thin' | 'medium' | 'thick'
}
export type NavlinkProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'mainbar' | 'sidebar'
}
//COMPONENT PROPS
export type ProfileIconProps = {
    avatarProps: ProfileAvatarProps
}
//STORES
export type SidebarStore = {
    enabled: boolean,
    setEnabled: (newVal: boolean) => void
}
