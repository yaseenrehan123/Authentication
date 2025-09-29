import express from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../generated/prisma/client.js";
import { loginSchema } from "../validations.js";
import authenticateToken from "../middleware/authenticateToken.js";

const meRouter = express.Router();
const prisma = new PrismaClient();

meRouter.get('/', authenticateToken, async (req, res) => {
    const decoded = (req as any).user;

    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!user) {
        res.status(400).json({
            succes: false,
            error: "User not found"
        })
    };

    return res.status(200).json({
        success: true,
        user: user
    })

});

export default meRouter;