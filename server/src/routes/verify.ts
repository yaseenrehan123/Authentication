import express from "express";
import bycrypt from "bcrypt";
import { PrismaClient } from "../../generated/prisma/client.js";
import { verificationSchema } from "../validations.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import jwt from "jsonwebtoken";

const verifyRouter = express.Router();
const prisma = new PrismaClient();

verifyRouter.post('/', async (req, res) => {
    try {
        const result = verificationSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.message
            });
        };
        const data = result.data!;
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            include: {
                verificationCode: true
            }
        });

        if (!user || !user.verificationCode) {
            return res.status(400).json({ success: false, error: "Invalid verification request" });
        }

        const expiresAt = new Date(user.verificationCode.createdAt.getTime() + 30 * 60 * 1000);
        if (new Date() > expiresAt) {
            return res.status(400).json({
                success: false,
                error: "Code expired"
            })
        };

        const valid = await bycrypt.compare(data.verificationCode.toString(), user.verificationCode.verificationCode);
        if (!valid) {
            return res.status(400).json({
                success: false,
                error: "Code not valid"
            })
        };

        await prisma.user.update({
            where: { id: user.id },
            data: { verified: true }
        });

        await prisma.verificationCode.delete({
            where: { id: user.verificationCode.id }
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET!)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
        });

        res.cookie('hasRefreshToken', true, {
            httpOnly: false,
            sameSite: 'lax'
        });

        res.clearCookie('verifyEmail');

        return res.status(200).json({
            success: true,
            accessToken: accessToken
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }

})

export default verifyRouter;