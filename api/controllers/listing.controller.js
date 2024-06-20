import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const add = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
