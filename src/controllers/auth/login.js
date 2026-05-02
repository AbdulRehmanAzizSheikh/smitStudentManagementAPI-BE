import User from "../../models/user.js";
import { generateToken } from "../../utils/token/index.js";
import bcrypt from "bcrypt";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const token = await generateToken({
    payload: { _id: user._id },
  });
  if (!token.success) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate token",
    });
  }
  await user.loginTokens.push({
    token: token.token,
  });
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token: token.token,
      user,
    },
  });
};

export default loginController;
