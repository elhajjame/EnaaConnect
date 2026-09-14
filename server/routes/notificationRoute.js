import { Router } from "express";
import { getMyNotifications } from "../controllers/notificationController.js";
import protect from "../middleware/protectMiddleware.js";

const route = Router();

route.get("/", protect, getMyNotifications);

export default route;
