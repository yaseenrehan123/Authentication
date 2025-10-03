import jwt from "jsonwebtoken";
import { User } from "../../generated/prisma/index.js";
function generateAccessToken(user: User) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "30m"
    });
}

export default generateAccessToken;