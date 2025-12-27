import { z } from "zod";

const resetPasswordSchema = z.object({
    token: z.string(),
    email: z.string().email("Invalid email address"),
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

export default resetPasswordSchema;