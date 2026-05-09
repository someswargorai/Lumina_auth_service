import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }   
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as JwtPayload;

        req.userId = decoded.id;
        next();

    } catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
    }
}
export default verifyToken

