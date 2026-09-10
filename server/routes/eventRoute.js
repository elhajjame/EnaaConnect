import { Router } from "express";
import { createEvent } from "../controllers/eventController.js";
import protect from "../middleware/protectMiddleware.js";
import { requireStudent } from "../middleware/roleMiddleware.js";
import { validateCreateEvent } from "../middleware/eventMiddleware.js";

const route = Router();

route.post("/", protect, requireStudent, validateCreateEvent, createEvent);

export default route;
