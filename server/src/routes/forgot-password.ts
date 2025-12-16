import express from "express";
import crypto from "crypto";
import bcyrpt from "bcrypt";
//import jwt from "jsonwebtoken";
import { forgotPasswordSchema } from "../validations.js";
import { sendMail } from "../resend.js";
import prisma from "../db.js";

const forgotPasswordRouter = express.Router();

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
        const hashedToken: string = await bcyrpt.hash(token, 10);
        /*const jwtToken: string = jwt.sign({ email: data.email }, process.env.RESET_PASSWORD_VERIFICATION_SECRET!, {
            expiresIn: '30m'
        });*/
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
                        token: hashedToken
                    }
                }
            }
        });

        /*res.cookie("resetEmail", data.email, {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 30 * 60 * 1000
        });*/

        await sendMail({
            subject: "Forgot password validation",
            message: `Click the link to  reset password: ${resetUrl}`,
            address: data.email
        });

        return res.status(200).json({
            success: true
        });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }

});

export default forgotPasswordRouter;