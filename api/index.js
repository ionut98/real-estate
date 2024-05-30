import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to Mongo", err);
  });

app.listen(30401, () => {
  console.log("Server is listening on 30401");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
