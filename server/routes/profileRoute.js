import { Router } from "express";
import protect from "../middleware/protectMiddleware.js";
import {
  validateProfileUpdate,
  validatePublicProfileParams,
} from "../middleware/profileMiddleware.js";
import {
  getPublicProfile,
  updateMyProfile,
  updateProfilePicture,
} from "../controllers/profileController.js";
import {
  receiveProfilePicture,
  validateProfilePicture,
} from "../middleware/profilePictureMiddleware.js";

const route = Router();

route.patch(
  "/profile-picture",
  protect,
  receiveProfilePicture,
  validateProfilePicture,
  updateProfilePicture,
);
route.get("/:userId", protect, validatePublicProfileParams, getPublicProfile);
route.patch("/update-profile", protect, validateProfileUpdate, updateMyProfile);

export default route;
