import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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

export default authenticateToken;