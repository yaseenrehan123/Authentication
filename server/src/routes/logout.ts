import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";

const logoutRouter = express.Router();

logoutRouter.post('/', authenticateToken, (req, res) => {
    try {
        const decoded = (req as any).user;

        res.clearCookie('hasRefreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
        });

        return res.status(200).json({
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal server occured"
        });
    }
});

export default logoutRouter;