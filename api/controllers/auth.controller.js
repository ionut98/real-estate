import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next(errorHandler(404, "User not found!"));
    }

    console.log(foundUser);

    const isValidPassword = bcryptjs.compareSync(password, foundUser.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
    const { password: userPass, ...userPublicData } = foundUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userPublicData);
  } catch (err) {
    next(err);
  }
};
