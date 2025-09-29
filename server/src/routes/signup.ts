import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { PrismaClient } from "../../generated/prisma/index.js";
import { signupSchema } from "../validations.js";
import { sendMail } from "../nodemailer.js";
import issueVerificationCode from "../utils/issueVerificationCode.js";

const signupRouter = express.Router();
const prisma = new PrismaClient();

signupRouter.post('/', async (req, res) => {
    try {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                error: result.error.message
            });
        }
        const data = result.data!;
        if (data.password !== data.confirmPassword) {
            res.status(400).json({
                success: false,
                error: 'passwords not matching'
            })
        };

        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (user) {
            if (!user.verified) {
                const hashedPassword = await bcrypt.hash(data.password, 10);
                if (hashedPassword !== user.password) {
                    await prisma.user.update({
                        where: { email: user.email },
                        data: {
                            password: hashedPassword,
                        }
                    });
                }

                issueVerificationCode(user);

                return res.status(200).json({
                    success: true,
                    pendingVerification: true
                });
            }
            return res.status(400).json({
                success: false,
                error: "Account already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
                verified: false,
            }
        });

        issueVerificationCode(newUser);

        console.log(newUser);

        return res.status(200).json({
            success: true
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

export default signupRouter;