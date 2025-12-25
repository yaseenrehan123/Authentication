import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";

const logoutRouter = express.Router();

logoutRouter.post('/', authenticateToken, (req, res) => {
    try {
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