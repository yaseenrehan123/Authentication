import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import prisma from "./db.js";
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import refreshRouter from "./routes/refresh.js";
import meRouter from "./routes/me.js";
import verifyRouter from "./routes/verify.js";
import resendCodeRouter from "./routes/resend-code.js";
import editProfileRouter from "./routes/edit-profile.js";
import logoutRouter from "./routes/logout.js";
import forgotPasswordRouter from "./routes/forgot-password.js";
import verifyPasswordResetTokenRouter from "./routes/verifyPasswordResetToken.js";
import resetPasswordRouter from "./routes/resetPassword.js";
import deleteAccountRouter from "./routes/delete-account.js";
import { initResend } from "./resend.js";
const app = express();
const PORT = 8081;

main()
    .catch((e: Error) => {
        console.error(e.message);
    })
    .finally(async () => {
        prisma.$disconnect();
    })


async function main() {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(cookieParser());

    dotenv.config();

    app.listen(
        PORT,
        async () => {
            console.log(`It's alive on http://localhost:${PORT}`);
        }
    );

    initResend();
    //initNodemailer();

    app.use('/signup', signupRouter);
    app.use('/login', loginRouter);
    app.use('/refresh', refreshRouter);
    app.use('/me', meRouter);
    app.use('/verify', verifyRouter);
    app.use('/resend-code', resendCodeRouter)
    app.use('/edit-profile', editProfileRouter);
    app.use('/logout', logoutRouter);
    app.use('/forgot-password', forgotPasswordRouter);
    app.use('/verify-password-reset', verifyPasswordResetTokenRouter);
    app.use('/reset-password', resetPasswordRouter);
    app.use('/delete-account', deleteAccountRouter);
}