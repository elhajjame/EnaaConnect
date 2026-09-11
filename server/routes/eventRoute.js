import { Router } from "express";
import {
  createEvent,
  getApprovedEvents,
  getEventParticipants,
  joinEvent,
  leaveEvent,
  reviewEvent,
} from "../controllers/eventController.js";
import protect from "../middleware/protectMiddleware.js";
import { requireAdmin, requireStudent } from "../middleware/roleMiddleware.js";
import {
  validateCreateEvent,
  validateEventParams,
  validateReviewEvent,
} from "../middleware/eventMiddleware.js";

const route = Router();

route.get("/", protect, getApprovedEvents);

route.get(
  "/:eventId/participants",
  protect,
  requireStudent,
  validateEventParams,
  getEventParticipants,
);

route.post(
  "/:eventId/join",
  protect,
  requireStudent,
  validateEventParams,
  joinEvent,
);

route.patch(
  "/:eventId/review",
  protect,
  requireAdmin,
  validateEventParams,
  validateReviewEvent,
  reviewEvent,
);

route.delete(
  "/:eventId/join",
  protect,
  requireStudent,
  validateEventParams,
  leaveEvent,
);
export default route;
