import { z } from "zod";

const deleteAccountConfirmationSchema = z.object({
    username: z.string()
        .min(8, "Username must contain minimum 8 characters")
        .max(15, "Username cant exceed more than 15 characters")
});

export default deleteAccountConfirmationSchema;