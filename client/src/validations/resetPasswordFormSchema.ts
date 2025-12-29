import { z } from "zod";

const resetPasswordFormSchema = z.object({
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

export default resetPasswordFormSchema;