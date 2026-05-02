import express from "express";
import registerController from "../controllers/auth/register.js";
import verifyEmailController from "../controllers/auth/verifyEmail.js";
import loginController from "../controllers/auth/login.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerController);
authRoutes.patch("/verify-email", verifyEmailController);
authRoutes.patch("/login", loginController);

export default authRoutes;
