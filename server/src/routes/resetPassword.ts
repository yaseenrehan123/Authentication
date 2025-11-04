import { PrismaClient } from "../../generated/prisma/index.js";
import express from "express";
import { resetPasswordSchema } from "../validations.js";
import bcrypt from "bcrypt";

const resetPasswordRouter = express.Router();
const prisma = new PrismaClient();

resetPasswordRouter.post('/', async (req, res) => {
    const result = resetPasswordSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            error: result.error.message
        })
    };
    const data = result.data!;

    const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: {
            resetPasswordToken: true
        }
    });

    if (!user || !user.resetPasswordToken) {
        return res.status(400).json({
            success: false,
            error: "User not found"
        });
    }

    const expiresAt = new Date(user.resetPasswordToken.createdAt.getTime() + 30 * 60 * 1000);
    if (new Date() > expiresAt) {
        return res.status(400).json({
            success: false,
            error: "Code expired"
        })
    };

    const valid = bcrypt.compare(data.token, user.resetPasswordToken.token);
    if (!valid) {
        return res.status(400).json({
            success: false,
            error: "Incorrect code"
        });
    };

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.update({
        where: { email: user.email },
        data: { password: hashedPassword }
    });

    await prisma.resetPasswordToken.delete({
        where: { id: user.resetPasswordToken.id },
    });

    return res.status(200).json({
        success: true
    });

});

export default resetPasswordRouter;