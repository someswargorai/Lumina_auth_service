import { userVerificationSchema } from "../../zod/userVerification.js";
import schema from "../../models/users/userSchema.js";
import { redis } from "../../configs/redis_config.js";
import { publishToQueue } from "../../producer/publishToQueue.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const verifyOtpController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, otp, city, country, state, username, bio, interests } = req.body;

        const parsedBody = userVerificationSchema.safeParse(req.body);

        if (!parsedBody.success) {
            const { issues } = parsedBody.error;
            return res.status(400).json({ success: false, data: { issues } });
        }

        //verify otp from redis
        const userMail = `userMail:${email}`;
        const storedOtp = await redis.get(userMail);

        if (!storedOtp) {
            return res.status(400).json({ success: false, data: { message: "OTP expired" } });
        }

        if (storedOtp !== otp) {
            return res.status(400).json({ success: false, data: { message: "OTP does not match" } });
        }
        const hashedPassword = bcrypt.hash(password, 10);

        const user = new schema({
            name,
            email,
            password: hashedPassword,
            city,
            country,
            state,
            username,
            bio,
            interests
        });

        await user.save();
        const subject = 'Welcome to our Lumina Platform'
        const msg = `Your account has been created successfully. You can now login to our platform.`;

        await redis.del(userMail);
        await publishToQueue(email, subject, msg);

        return res.status(200).json({ success: true, data: { message: "User created successfully" } });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, data: { message: "Internal server error" } });
    }
}

export { verifyOtpController };
