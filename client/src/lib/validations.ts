import z from "zod";
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