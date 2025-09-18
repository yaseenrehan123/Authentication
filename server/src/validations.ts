import { z } from "zod";

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