import z from "zod";
const loginSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string()
        .min(8, "Password must contain minimum 8 characters")
        .max(15, "Password cant exceed more than 15 characters")
});

export default loginSchema;