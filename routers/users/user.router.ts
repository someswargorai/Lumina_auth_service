import express from 'express';
import { rateLimit } from '../../middlewares/rateLimit.middleware';
import { verifyUserController } from '../../controllers/users/verify-user-controller.controller';
import { verifyOtpController } from '../../controllers/users/verify-otp-controller.controller';
import { loginController } from '../../controllers/users/login-controller.controller';
import { googleLoginController } from '../../controllers/users/google-login.controller';

const router = express.Router();


router.post('/verify-user', rateLimit, verifyUserController);
router.post("/verify-otp", rateLimit, verifyOtpController);
router.post("/login", rateLimit, loginController);
router.post("/google-login", rateLimit, googleLoginController)

export { router };
