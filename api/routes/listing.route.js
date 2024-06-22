import { Router } from "express";
import { add, remove, update, get } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const listingRouter = Router();

listingRouter.get("/:id", get);
listingRouter.post("/add", verifyToken, add);
listingRouter.delete("/delete/:id", verifyToken, remove);
listingRouter.post("/update/:id", verifyToken, update);

export default listingRouter;
