import User from "../../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token/index.js";
import mailSender from "../../utils/mailSender/index.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = await generateToken({ payload: { email } });
    await User.create({
      username,
      email,
      password: hashedPassword,
      verify: {
        token: verificationCode.token,
      },
    });
    const emailStatus = await mailSender({
      to: email,
      subject: "Verify Your Email",
      html: `<html>
<head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
<p>Your Verification Code is: ${verificationCode.token}</p>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #4A90E2; padding: 40px 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to SMIT!</h1>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333333; margin-top: 0;">Verify Your Email</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                                Hi there, <br><br>
                                Thank you for registering with us. To complete your sign-up process and activate your account, please click the button below:
                            </p>
                            <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px;">
                                <tr>
                                    <td align="center" style="border-radius: 4px;" bgcolor="#4A90E2">
                                        <!-- Yahan tum apna frontend URL aur token dynamic dalo ge -->
                                        <a href="https://www.myinstants.com/media/sounds/fahhhhhhhhhhhhhh.mp3" target="_blank" style="padding: 15px 25px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; display: inline-block;">Verify Account</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #999999; font-size: 14px; margin-top: 30px;">
                                If you didn't create an account, you can safely ignore this email. This link will expire in 24 hours.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #eeeeee; padding: 20px; text-align: center; color: #999999; font-size: 12px;">
                            © 2026 SMIT Student Management API. All rights reserved. <br>
                            Karachi, Pakistan.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    });
    if (emailStatus.success) {
      return res.status(201).json({ message: "User registered successfully" });
    }
    await User.deleteOne({ email });
    return res.status(500).json({ message: "Failed to send email" });
  } catch (error) {
    console.log("error in register", error);
    return res.status(500).json({ message: error.message });
  }
};

export default registerController;
