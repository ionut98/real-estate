import { Router } from "express";
import { add, remove } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const listingRouter = Router();

listingRouter.post("/add", verifyToken, add);
listingRouter.delete("/delete/:id", verifyToken, remove);

export default listingRouter;
