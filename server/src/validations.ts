import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(8),
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string()
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});

export const verificationSchema = z.object({
    email: z.email(),
    verificationCode: z.string().length(6)
});