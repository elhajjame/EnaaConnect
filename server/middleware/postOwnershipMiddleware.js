import Post from "../models/PostModel.js";
import { errorResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";

export const PostOwnership = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return errorResponse(res, 403, "You can only modify your own posts");
    }
    req.post = post;
    next();
  } catch (error) {
    return handleControllerError(res, error);
  }
};
