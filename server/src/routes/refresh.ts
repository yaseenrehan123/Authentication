import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../utils/generateAccessToken.js";
import { refreshRouterSchema } from "../validations.js";

const refreshRouter = express.Router();

refreshRouter.post('/', (req, res) => {
    const result = refreshRouterSchema.safeParse(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            error: result.error.message
        });
    };

    const data = result.data!;
    const refreshToken = data.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
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

export default refreshRouter;