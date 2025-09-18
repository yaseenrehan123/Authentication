import type { NavLinkProps as RouterNavlinkProps } from "react-router";
import { signupSchema } from "./lib/validations";
import { z } from "zod";

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
    avatarUrl?: string,
}
export type ColumnDividerProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'thin' | 'medium' | 'thick'
}
export type NavlinkProps = React.HTMLAttributes<HTMLDivElement> & Partial<RouterNavlinkProps> & {
    variant?: 'mainbar' | 'sidebar',
}
export type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    variant?: 'default' | 'small' | 'large',
}
export type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default'
}
export type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'success' | 'loading' | 'error'
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
//INFERS
export type SignupFormFields = z.infer<typeof signupSchema>