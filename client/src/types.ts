import type { NavLinkProps as RouterNavlinkProps } from "react-router";
import { loginSchema, editProfileSchema, signupSchema, verificationCodeSchema, verificationSchema, forgotPasswordSchema } from "./lib/validations";
import { z } from "zod";

//GENERAL
export type JwtPayload = {
    exp: number
};
export type ProfileRetrievableValues = Omit<ProfileStore,
    | 'setId'
    | 'setUsername'
    | 'setEmail'
    | 'setCreatedAt'
    | 'setUpdatedAt'
>;
export type SetProfileFormStoreValues = Pick<EditProfileFormStore,
    | "setUsername"
>
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
    bg?: "light" | "dark"
}
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default'
}
export type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'success' | 'loading' | 'error',
    disableOnContent?: 'never' | 'sm' | 'md' | 'lg',
    content?: String
}
export type FormContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'light' | 'dark'
};
export type AlignmentProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'rowLeft' | 'rowCenter' | 'rowRight' | 'colLeft' | 'colCenter' | 'colRight',
    gap?: 'sm' | 'md' | 'lg'
};
//COMPONENT PROPS
export type ProfileIconProps = {
    avatarProps: ProfileAvatarProps
}
export type EditableProfileFieldProps = {
    label: string,
    profileDataKey: keyof ProfileRetrievableValues,
    setFieldKey: keyof SetProfileFormStoreValues,
    inputProps?: FormFieldProps
}
//STORES
export type SidebarStore = {
    enabled: boolean,
    setEnabled: (newVal: boolean) => void
}
export type AuthStore = {
    accessToken: string,
    setAccessToken: (newVal: string) => void,
    loggedIn: boolean,
    setLoggedIn: (newVal: boolean) => void
}
export type ProfileStore = {
    id: string,
    username: string,
    email: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    setId: (newVal: string) => void,
    setUsername: (newVal: string) => void
    setEmail: (newVal: string) => void
    setCreatedAt: (newVal: Date | null) => void,
    setUpdatedAt: (newVal: Date | null) => void
}
export type EditProfileFormStore = EditProfileFormFields & {
    setUsername: (newVal: string) => void,
    editingFields: Set<string>,
    startEditing: (field: string) => void,
    stopEditing: (field: string) => void,
    clearEditing: () => void,
    confirmEditing: () => void
}
//INFERS
export type SignupFormFields = z.infer<typeof signupSchema>
export type LoginFormFields = z.infer<typeof loginSchema>
export type VerificationFields = z.infer<typeof verificationSchema>
export type VerifcationCode = z.infer<typeof verificationCodeSchema>
export type EditProfileFormFields = z.infer<typeof editProfileSchema>
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>