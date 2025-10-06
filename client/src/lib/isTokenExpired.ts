import type { JwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp) return true;

        const now = Date.now();
        return decoded.exp < now
    }
    catch (err) {
        return true
    }
};

export default isTokenExpired;