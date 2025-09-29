import express from "express";
import bycrypt from "bcrypt";
import { PrismaClient } from "../../generated/prisma/client.js";
import { verificationSchema } from "../validations.js";

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

        const valid = bycrypt.compare(data.verificationCode.toString(), user.verificationCode.verificationCode);
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

})

export default verifyRouter;