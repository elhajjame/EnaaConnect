import { Router } from "express";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController.js";
import protect from "../middleware/protectMiddleware.js";
import { validateNotificationParams } from "../middleware/notificationMiddleware.js";

const route = Router();

route.get("/", protect, getMyNotifications);
route.patch(
  "/:notificationId/read",
  protect,
  validateNotificationParams,
  markNotificationAsRead,
);
export default route;
