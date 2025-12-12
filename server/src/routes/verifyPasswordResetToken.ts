import express from "express";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
import { verifyPasswordResetTokenSchema } from "../validations.js";
import prisma from "../db.js";

const verifyPasswordResetTokenRouter = express.Router();

verifyPasswordResetTokenRouter.post('/', async (req, res) => {
    try {
        const result = verifyPasswordResetTokenSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.message
            });
        };

        const { email, token } = result.data!;

        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                resetPasswordToken: true
            }
        });

        if (!user || !user.resetPasswordToken) {
            return res.status(400).json({
                success: false,
                error: "Invalid verification request"
            });
        };

        const expiresAt = new Date(user.resetPasswordToken.createdAt.getTime() + 30 * 60 * 1000);
        if (new Date() > expiresAt) {
            return res.status(400).json({
                success: false,
                error: "Code expired"
            })
        };

        const valid = bcrypt.compare(token, user.resetPasswordToken.token);
        if (!valid) {
            return res.status(400).json({
                success: false,
                error: "Incorrect code"
            });
        };

        return res.status(200).json({
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
});

export default verifyPasswordResetTokenRouter;