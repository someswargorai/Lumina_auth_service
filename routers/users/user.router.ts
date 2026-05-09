import express from 'express';
import { rateLimit } from '../../middlewares/rateLimit.middleware.js';
import { verifyUserController } from '../../controllers/users/verify-user-controller.controller.js';
import { verifyOtpController } from '../../controllers/users/verify-otp-controller.controller.js';
import { loginController } from '../../controllers/users/login-controller.controller.js';
import { googleLoginController } from '../../controllers/users/google-login.controller.js';

const router = express.Router();


router.post('/verify-user', rateLimit, verifyUserController);
router.post("/verify-otp", rateLimit, verifyOtpController);
router.post("/login", rateLimit, loginController);
router.post("/google-login", rateLimit, googleLoginController)

export { router };
