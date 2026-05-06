import express from "express";
import registerController from "../controllers/auth/register.controller.js";
import verifyEmailController from "../controllers/auth/verifyEmail.controller.js";
import loginController from "../controllers/auth/login.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerController);
authRoutes.patch("/verify-email", verifyEmailController);
authRoutes.patch("/login", loginController);

export default authRoutes;
