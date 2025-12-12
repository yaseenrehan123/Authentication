import { User } from "../../generated/prisma/index.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "../db.js";
import { sendMail } from "../resend.js";

async function issueVerificationCode(user: User) {
    const code = crypto.randomInt(100000, 999999);
    const hashedCode = await bcrypt.hash(code.toString(), 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            verificationCode: {
                create: {
                    verificationCode: hashedCode
                }
            }
        }
    });

    await sendMail({
        subject: 'Verify your email address',
        message: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #333;">Verify your email address</h2>
                <p>Thanks for signing up, <b>${user.username}</b>!</p>
                <p>Please verify your email by copying the code below:</p>
                <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #4CAF50;">
                    ${code}
                </div>
                <p>This code expires in <b>30 minutes</b>.</p>
                </div>
            `,
        address: user.email
    });
}

export default issueVerificationCode;