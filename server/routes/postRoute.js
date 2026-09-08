import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  togglePostLike,
  updatePost,
} from "../controllers/postController.js";
import {
  validateCreateComment,
  validateCreatePost,
  validatePostParams,
  validateUpdatePost,
} from "../middleware/postMiddleware.js";
import protect from "../middleware/protectMiddleware.js";
import { requireStudent } from "../middleware/roleMiddleware.js";
import { PostOwnership } from "../middleware/postOwnershipMiddleware.js";
import { createComment, getComments } from "../controllers/commentController.js";

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
route.delete(
  "/:postId",
  protect,
  requireStudent,
  validatePostParams,
  PostOwnership,
  deletePost,
);

route.patch(
  "/:postId/like",
  protect,
  requireStudent,
  validatePostParams,
  togglePostLike,
);

route.post(
  "/:postId/comments",
  protect,
  requireStudent,
  validatePostParams,
  validateCreateComment,
  createComment,
);

route.get("/:postId/comments", protect, validatePostParams, getComments);
export default route;
