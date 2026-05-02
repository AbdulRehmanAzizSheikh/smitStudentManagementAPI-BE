import User from "../../models/user.js";

const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token is required" });
    }
    const user = await User.findOne({ "verify.token": token });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
    user.verify.status = true;
    user.verify.token = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log("error in verifyEmail", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export default verifyEmailController;
