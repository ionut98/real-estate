import { Router } from "express";
import { updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/update/:id", updateUser);

export default userRouter;
