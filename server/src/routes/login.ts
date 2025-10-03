import express from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../generated/prisma/client.js";
import { loginSchema } from "../validations.js";

import generateAccessToken from "../utils/generateAccessToken.js";

const loginRouter = express.Router();
const prisma = new PrismaClient();

loginRouter.post('/', async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).send({
                success: false,
                error: result.error.message
            });
        };
        const data = result.data!;

        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });
        };
        if (!user.verified) {
            return res.status(400).json({
                success: false,
                error: "Account not verified"
            });
        }
        const verified = await bycrypt.compare(data.password, user?.password!);
        if (!verified) {
            return res.status(400).json({
                success: false,
                error: 'Password not matched'
            })
        };
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET!,);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict'
        })

        return res.status(200).json({
            success: true,
            accessToken: accessToken,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }

});

export default loginRouter;