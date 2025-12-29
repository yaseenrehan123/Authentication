import z from "zod";

const verificationCodeSchema = z.string().length(6);

export default verificationCodeSchema;