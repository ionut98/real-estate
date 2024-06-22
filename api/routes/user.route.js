import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUserListings,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = Router();

userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListings);

export default userRouter;
