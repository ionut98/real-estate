import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { email, password, username } = req.body;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword, username });

  try {
    await newUser.save();

    res.status(201).json("User created successfully!");
  } catch (err) {
    next(err);
  }
};
