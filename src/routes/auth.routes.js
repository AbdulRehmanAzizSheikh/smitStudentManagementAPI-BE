import express from "express";
import registerController from "../controllers/auth/register.controller.js";
import verifyEmailController from "../controllers/auth/verifyEmail.controller.js";
import loginController from "../controllers/auth/login.controller.js";
import authRateLimit from "../utils/rateLimiters/authRateLimit.js";
const authRoutes = express.Router();

authRoutes.post("/login", authRateLimit, loginController);
authRoutes.post("/register", authRateLimit, registerController);
authRoutes.patch("/verify-email", authRateLimit, verifyEmailController);

export default authRoutes;
