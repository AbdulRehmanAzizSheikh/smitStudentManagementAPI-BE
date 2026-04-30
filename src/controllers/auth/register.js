import User from "../../models/user.js"
import bcrypt from "bcrypt"
import { generateToken } from "../../utils/token/index.js"
import mailSender from "../../utils/mailSender/index.js"

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationCode = await generateToken({ payload: {email} })
        await User.create({
            username,
            email,
            password: hashedPassword,
            verify: {
                token: verificationCode.token,
            }
        })
        const emailStatus = await mailSender({ to: email, subject: "Verify Your Email", text: `<h1>Your Verification Code is: ${verificationCode.token}</h1>` })
        if (emailStatus.success) {
            return res.status(201).json({ message: "User registered successfully" })
        }
        await User.deleteOne({ email })
        return res.status(500).json({ message: "Failed to send email" })
    } catch (error) {
        console.log("error in register", error)
        return res.status(500).json({ message: error.message })
    }
}

export default registerController