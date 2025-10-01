import express from "express";
import { resendCodeSchema } from "../validations.js";
import { PrismaClient } from "../../generated/prisma/index.js";
import issueVerificationCode from "../utils/issueVerificationCode.js";

const resendCodeRouter = express.Router();
const prisma = new PrismaClient();

resendCodeRouter.post('/', async (req, res) => {
    try {
        const result = await resendCodeSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(200).json({
                success: false,
                error: result.error.message
            })
        }
        const { email } = result.data!;

        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User does not exist"
            })
        };
        if (user.verified) {
            return res.status(400).json({
                success: false,
                error: "User already verified"
            })
        };
        issueVerificationCode(user);
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

});

export default resendCodeRouter;