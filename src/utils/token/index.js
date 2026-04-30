import jwt from "jsonwebtoken"

const generateToken = async ({ payload, expiresIn = "1d" }) => {
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET, expiresIn && { expiresIn })
        return {
            success: true,
            message: "Token generated successfully",
            token
        }
    } catch (error) {
        console.log("Error in generateToken:", error)
        return {
            success: false,
            message: `Failed to generate token because ${error.message}`,
            error: error.message
        }
    }
}

const verifyToken = async (token) => {
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        return {
            success: true,
            message: "Token verified successfully",
            data: payload
        }
    } catch (error) {
        console.log("Error in verifyToken:", error)
        return {
            success: false,
            message: `Failed to verify token because ${error.message}`,
            error: error.message
        }
    }
}

export { generateToken, verifyToken }