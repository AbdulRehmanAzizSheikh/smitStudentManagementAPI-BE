import express from "express"
import registerController from "../controllers/auth/register.js"
import verifyEmailController from "../controllers/auth/verifyEmail.js"

const authRoutes = express.Router()

authRoutes.post("/register", registerController)
authRoutes.patch("/verify-email", verifyEmailController)
authRoutes.get("/login", (req, res) => {
    res.send("login route called")
})

export default authRoutes