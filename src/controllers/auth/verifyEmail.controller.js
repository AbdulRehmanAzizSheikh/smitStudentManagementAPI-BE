import User from "../../models/user.js";
import { successResponse } from "../../utils/responseHandlers/succesResponse.js";

const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new Error("Token is required");
    }
    const user = await User.findOne({ "verify.token": token });
    if (!user) {
      throw new Error("Invalid token");
    }
    user.verify.status = true;
    user.verify.token = undefined;
    await user.save();
    return successResponse(res, 200, true, "Email verified successfully");
  } catch (error) {
    next(error);
  }
};
export default verifyEmailController;
