import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import schema from "../../models/users/userSchema.js";

const   loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, data: { message: "Email and password are required" } });
        }

        const user = await schema.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, data: { message: "User not found" } });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, data: { message: "Invalid credentials" } });
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
};

export { loginController };