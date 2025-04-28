import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("🥎 Connected to MongoDB Server"))
  .catch(() => console.log("💥 Failed to connect to MongoDB Server"));

app.listen(process.env.PORT, () =>
  console.log(`⚾ Connected to on ${process.env.PORT} server`),
);
