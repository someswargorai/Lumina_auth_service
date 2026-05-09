import { Request, Response } from "express";
import schema from "../../models/users/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const googleLoginController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, data: { message: "Email is required" } });
        }

        const user = await schema.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, data: { message: "User not found" } });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "2d" }
        ); 

        return res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                access_token: token
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, data: { message: "Internal server error" } });
    }
}

export { googleLoginController };
