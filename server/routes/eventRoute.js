import { Router } from "express";
import { createEvent, reviewEvent } from "../controllers/eventController.js";
import protect from "../middleware/protectMiddleware.js";
import { requireAdmin, requireStudent } from "../middleware/roleMiddleware.js";
import {
  validateCreateEvent,
  validateEventParams,
  validateReviewEvent,
} from "../middleware/eventMiddleware.js";

const route = Router();

route.post("/", protect, requireStudent, validateCreateEvent, createEvent);
route.patch(
  "/:eventId/review",
  protect,
  requireAdmin,
  validateEventParams,
  validateReviewEvent,
  reviewEvent,
);
export default route;
