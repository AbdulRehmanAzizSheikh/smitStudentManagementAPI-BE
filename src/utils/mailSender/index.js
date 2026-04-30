import nodemailer from "nodemailer"

const mailSender = async ({ to, subject, text }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        await transporter.sendMail(mailOptions)
        return { success: true, message: `Email sent to ${to} successfully` }
    } catch (error) {
        console.log("Error in mailSender:", error)
        return { success: false, message: `Failed to send email to ${to} because ${error.message}` }
    }
}

export default mailSender