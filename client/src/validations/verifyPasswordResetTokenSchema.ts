import z from "zod";

export const verifyPasswordResetTokenSchema = z.object({
    token: z.string("Token cant be empty"),
    email: z.email("Invalid email")
});

export default verifyPasswordResetTokenSchema;