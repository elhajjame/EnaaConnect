import { Router } from "express";
import {
  getMyNotifications,
  markAllNotificationsAsRead,
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

route.patch("/read-all", protect, markAllNotificationsAsRead);
export default route;
