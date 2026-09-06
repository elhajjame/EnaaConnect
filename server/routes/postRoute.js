import { Router } from "express";
import { createPost } from "../controllers/postController.js";
import { validateCreatePost } from "../middleware/postMiddleware.js";
import protect from "../middleware/protectMiddleware.js";
import { requireStudent } from "../middleware/roleMiddleware.js";

const route = Router();
route.post("/", protect, requireStudent, validateCreatePost, createPost);
export default route;
