import { email, z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(8).max(15),
    email: z.email(),
    password: z.string().min(8).max(15),
    confirmPassword: z.string().min(8).max(15)
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});

export const verificationSchema = z.object({
    email: z.email(),
    verificationCode: z.string().length(6)
});

export const resendCodeSchema = z.object({
    email: z.email()
});

export const editProfileSchema = z.object({
    username: z.string().min(8).max(15).optional()
});

export const forgotPasswordSchema = z.object({
    email: z.email()
});

export const verifyPasswordResetTokenSchema = z.object({
    token: z.string(),
    email: z.email()
});

export const resetPasswordSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(15),
    confirmPassword: z.string().min(8).max(15)
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ['confirmPassword']
});