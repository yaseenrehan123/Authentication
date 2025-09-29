import jwt from "jsonwebtoken";
function generateAccessToken(user: {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "30m"
    });
}

export default generateAccessToken;