import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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

// app.get('/', (req, res) => {
//   console.log('HELLO');
//   res.statusCode(200).send('HELLO');
// });
