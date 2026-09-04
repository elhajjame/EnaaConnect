import { Router } from "express";
import protect from "../middleware/protectMiddleware.js";
import {
  validateProfileUpdate,
  validatePublicProfileParams,
} from "../middleware/profileMiddleware.js";
import {
  getPublicProfile,
  updateMyProfile,
} from "../controllers/profileController.js";

const route = Router();

route.get("/:userId", protect, validatePublicProfileParams, getPublicProfile);
route.patch("/update-profile", protect, validateProfileUpdate, updateMyProfile);

export default route;
