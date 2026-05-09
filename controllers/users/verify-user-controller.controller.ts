import { Request, Response } from "express";
import { userVerificationSchema } from "../../zod/userVerification.js";
import schema from "../../models/users/userSchema.js";
import { redis } from "../../configs/redis_config.js";
import { publishToQueue } from "../../producer/publishToQueue.js";

const verifyUserController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await schema.findOne({ email: email });
        
        if (user) {
            return res.status(400).json({ success: false, data: { message: "User already exists" } });
        } else {
            
            // 1. Generate a robust 6-digit OTP
            const generateOtp = Math.floor(100000 + Math.random() * 900000);
            const userMail = `userMail:${email}`;

            // 2. STORE the OTP in Redis with a 60s expiration
            await redis.set(userMail, generateOtp, 'EX', 60);

            // 3. Await the queue publication
            const subject = "Verify your email";
            const msg = `Your OTP is ${generateOtp}`;

            await publishToQueue(email, subject, msg);

            return res.status(200).json({ success: true, data: { message: "User Verified successfully" } });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, data: { message: "Internal server error" } });
    }
}

export { verifyUserController };