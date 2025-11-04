import z, { email } from "zod";
export const signupSchema = z.object({
    username: z.string()
        .min(8, "Username must contain minimum 8 characters")
        .max(15, "Username cant exceed more than 15 characters"),
    email: z.email("Invalid email"),
    password: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters"),
    confirmPassword: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters")
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    })

export const loginSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters")
});
export const verificationSchema = z.object({
    pin1: z.number("Field cant be empty").min(0).max(9),
    pin2: z.number("Field cant be empty").min(0).max(9),
    pin3: z.number("Field cant be empty").min(0).max(9),
    pin4: z.number("Field cant be empty").min(0).max(9),
    pin5: z.number("Field cant be empty").min(0).max(9),
    pin6: z.number("Field cant be empty").min(0).max(9),
});
export const verificationCodeSchema = z.string().length(6);
export const editProfileSchema = z.object({
    username: z.string()
        .min(8, "Username must contain minimum 8 characters")
        .max(15, "Username cant exceed more than 15 characters")
});
export const forgotPasswordSchema = z.object({
    email: z.email("Invalid email")
});
export const verifyPasswordResetTokenSchema = z.object({
    token: z.string("Token cant be empty"),
    email: z.email("Invalid email")
});
export const resetPasswordFormSchema = z.object({
    password: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters"),
    confirmPassword: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});
export const resetPasswordSchema = z.object({
    token: z.string(),
    email: z.email(),
    password: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters"),
    confirmPassword: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
})