import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import prisma from "../db.js";
import { editProfileSchema } from "../validations.js";

const editProfileRouter = express.Router();

editProfileRouter.post('/', authenticateToken, async (req, res) => {
    try {
        const decoded = (req as any).user;
        const result = editProfileSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error
            });
        };
        const data = result.data!;

        const updatedFields = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );


        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User not found"
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: updatedFields
        });

        console.log(updatedUser);

        return res.status(200).json({
            success: true
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
});

export default editProfileRouter;