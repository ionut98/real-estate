import { Router } from "express";
import {
  google,
  login,
  signup,
  logout,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/google", google);
authRouter.get("/logout", logout);

export default authRouter;
