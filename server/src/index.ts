import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/client.js";
import { signupSchema, loginSchema } from "./validations.js";
const app = express();
const PORT = 8081;
const prisma = new PrismaClient();

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
            const newUser = await prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: hashedPassword
                }
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

            const verified = await bycrypt.compare(data.password, user?.password!);
            if (!verified) {
                return res.status(400).json({
                    success: false,
                    error: 'Password not matched'
                })
            };
            const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!)
            return res.status(200).json({
                success: true,
                accessToken: accessToken
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

    app.get('/me', authenticateToken, (req, res) => {
        const decoded = (req as any).user;

        const user = prisma.user.findUnique({
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
}