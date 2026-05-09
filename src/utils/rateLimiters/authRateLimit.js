import rateLimit from "express-rate-limit";

const authRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    statusCode: 429,
    status: false,
    message: "Too many requests from this IP, please try again later",
  },
});

export default authRateLimit;
