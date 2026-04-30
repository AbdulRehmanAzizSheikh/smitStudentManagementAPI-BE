import User from "../../models/user.js"
import { verifyToken } from "../../utils/token/index.js"

const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(400).json({ message: "Token is required" })
        }
        const user = await User.findOne({ "verify.token": token })
        if (!user) {
            return res.status(400).json({ message: "Invalid token" })
        }
        user.verify.status = true
        user.verify.token = undefined
        await user.save()
        return res.status(200).json({ message: "Email verified successfully" })
    } catch (error) {
        console.log("error in verifyEmail", error)
        return res.status(500).json({ message: error.message })
    }
}
export default verifyEmailController