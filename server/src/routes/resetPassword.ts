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
        where: { email: data.email }
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            error: "User not found"
        });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.update({
        where: { email: user.email },
        data: { password: hashedPassword }
    });

    return res.status(200).json({
        success: true
    });

});

export default resetPasswordRouter;