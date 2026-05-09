import User from "../../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token/index.js";
import mailSender from "../../utils/mailSender/index.js";
import { verifyEmailTemplate } from "../../templates/email/verifyEmail.js";
import { successResponse } from "../../utils/responseHandlers/succesResponse.js";

const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("All fields are required");
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
      html: verifyEmailTemplate(verificationCode.token),
    });

    if (emailStatus.success) {
      return successResponse(res, 201, true, "User registered successfully");
    }

    await User.deleteOne({ email });
    throw new Error("Failed to send email");
  } catch (error) {
    next(error);
  }
};

export default registerController;
