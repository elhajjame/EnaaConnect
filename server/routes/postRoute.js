import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import { createPost } from "../controllers/postController.js";

const route = Router();

route.post("/post", protect, createPost);
export default route;
