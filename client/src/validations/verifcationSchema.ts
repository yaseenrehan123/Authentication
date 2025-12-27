import z from "zod";

const verificationSchema = z.object({
    pin1: z.number("Field cant be empty").min(0).max(9),
    pin2: z.number("Field cant be empty").min(0).max(9),
    pin3: z.number("Field cant be empty").min(0).max(9),
    pin4: z.number("Field cant be empty").min(0).max(9),
    pin5: z.number("Field cant be empty").min(0).max(9),
    pin6: z.number("Field cant be empty").min(0).max(9),
});

export default verificationSchema;