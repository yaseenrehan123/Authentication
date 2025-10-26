import express from "express";
import crypto from "crypto";
import { forgotPasswordSchema } from "../validations.js";
import { sendMail } from "../nodemailer.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const forgotPasswordRouter = express.Router();

const prisma = new PrismaClient();

forgotPasswordRouter.post('/', async (req, res) => {
    try {
        const result = forgotPasswordSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error
            });
        }
        const data = result.data!;

        const token: string = crypto.randomBytes(32).toString("hex");
        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User not found"
            });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: {
                    create: {
                        token: token
                    }
                }
            }
        });


        await sendMail({
            subject: "Forgot password validation",
            email: process.env.MY_GOOGLE_EMAIL!,
            message: `Click the link to  reset password: ${resetUrl}`,
            address: data.email
        });

        return res.status(200).json({
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }

});

export default forgotPasswordRouter;