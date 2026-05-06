import User from "../../models/user.js";
import { generateToken } from "../../utils/token/index.js";
import bcrypt from "bcrypt";
import { successResponse } from "../../utils/responseHandler/succesResponse.js";

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = await generateToken({
      payload: { _id: user._id },
    });
    if (!token.success) {
      throw new Error("Failed to generate token");
    }
    await user.loginTokens.push({
      token: token.token,
    });
    await user.save();
    return successResponse(
      res,
      200,
      true,
      "Login successful",
      {
        token: token.token,
        user,
      },
      null,
    );
  } catch (error) {
    next(error);
  }
};

export default loginController;
