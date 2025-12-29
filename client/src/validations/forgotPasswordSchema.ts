import z from "zod";

const forgotPasswordSchema = z.object({
    email: z.email("Invalid email")
});

export default forgotPasswordSchema;