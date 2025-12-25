import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import prisma from "../db.js";

const deleteAccountRouter = express.Router();

deleteAccountRouter.post('/', authenticateToken, async (req, res) => {
    const decoded = (req as any).user;

    const user = await prisma.user.findUnique({
        where: { id: decoded.id }
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            error: "User not found"
        });
    }

    await prisma.user.delete({
        where: { id: user.id }
    });

    return res.status(200).json({
        success: true
    });
});

export default deleteAccountRouter;