import { Router } from "express";
import { add } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const listingRouter = Router();

listingRouter.post("/add", verifyToken, add);

export default listingRouter;
