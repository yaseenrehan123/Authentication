import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { PrismaClient } from "../generated/prisma/client.js";
import { signupSchema, loginSchema, verificationSchema } from "./validations.js";
import { initNodemailer, sendMail } from "./nodemailer.js";
const app = express();
const PORT = 8081;
const prisma = new PrismaClient();
initNodemailer();

main()
    .catch((e: Error) => {
        console.error(e.message);
    })
    .finally(async () => {
        prisma.$disconnect();
    })


async function main() {
    app.use(cors());
    app.use(express.urlencoded());
    app.use(express.json());

    dotenv.config();

    app.listen(
        PORT,
        async () => {
            console.log(`It's alive on http://localhost:${PORT}`);
        }
    );

    app.post('/signup', async (req, res) => {
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
            const hashedPassword = await bycrypt.hash(data.password, 10);
            const verificationCode = crypto.randomInt(100000, 999999);
            const hashedVerificationCode = await bycrypt.hash(verificationCode.toString(), 10);

            const newUser = await prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: hashedPassword,
                    verified: false,
                    verificationCode: {
                        create: {
                            verificationCode: hashedVerificationCode
                        }
                    }
                }
            });

            await sendMail({
                subject: 'Verify your email address',
                email: process.env.MY_GOOGLE_EMAIL!,
                message: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #333;">Verify your email address</h2>
                <p>Thanks for signing up, <b>${newUser.username}</b>!</p>
                <p>Please verify your email by copying the code below:</p>
                <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #4CAF50;">
                    ${verificationCode}
                </div>
                <p>This code expires in <b>30 minutes</b>.</p>
                </div>
            `,
                address: newUser.email
            });
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

    app.post('/login', async (req, res) => {
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
            const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET!);

            return res.status(200).json({
                success: true,
                accessToken: accessToken,
                refreshToken: refreshToken
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

    app.post('/refresh', (req, res) => {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            res.status(401).json({
                success: false,
                error: "No refresh token"
            })
        };

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!,
            (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
                if (err || !decoded || typeof decoded === "string") {
                    return res.status(403).json({
                        success: false,
                        error: "Token no longer valid"
                    });
                }
                const user = (decoded as any);
                const newAccessToken = generateAccessToken(user);
                return res.json({
                    success: true,
                    accessToken: newAccessToken
                });
            })

    });

    app.get('/me', authenticateToken, async (req, res) => {
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

    app.post('/verify', async (req, res) => {
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

    function authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                error: 'You do not have access'
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    error: "Token no longer valid"
                });
            }
            (req as any).user = user;
            next();
        })
    }

    function generateAccessToken(user: {
        id: string;
        email: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
        return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: "30m"
        });
    }
}