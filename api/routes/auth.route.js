import { Router } from "express";
import { google, login, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/google", google);

export default authRouter;
