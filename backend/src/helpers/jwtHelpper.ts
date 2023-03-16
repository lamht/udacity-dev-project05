import { UserItem } from "../models/UserItem";
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "../auth/JwtPayload";

const jwtSecret = process.env.JWT_SECRET;

export function generateJWT(user: UserItem): string {
    return jwt.sign({ sub: user.userId }, jwtSecret, { expiresIn: '1h' });
}
export function verify(token: string): JwtPayload {
    let isValid = false;
    let decodedOut;
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            isValid = false;
        }
        isValid = true;
        decodedOut = decoded;
    });
    if (!isValid) {
        throw new Error(`Token invalid`);
    }
    return decodedOut as JwtPayload;
}