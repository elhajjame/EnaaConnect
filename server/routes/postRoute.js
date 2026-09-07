import { Router } from "express";
import { createPost, getPosts, updatePost } from "../controllers/postController.js";
import { validateCreatePost, validatePostParams, validateUpdatePost } from "../middleware/postMiddleware.js";
import protect from "../middleware/protectMiddleware.js";
import { requireStudent } from "../middleware/roleMiddleware.js";
import { PostOwnership } from "../middleware/postOwnershipMiddleware.js";

const route = Router();

route.get("/", protect, getPosts);
route.post("/", protect, requireStudent, validateCreatePost, createPost);
route.patch(
  "/:postId",
  protect,
  requireStudent,
  validatePostParams,
  validateUpdatePost,
  PostOwnership,
  updatePost,
);

export default route;
