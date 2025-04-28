import express from "express";
import dotenv from "dotenv";
import postRouter from "./router/postRoutes";
import userRouter from "./router/userRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/posts", postRouter);
app.use("/user", userRouter);

export default app;
