import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

dotenv.config();

const app = express();
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
