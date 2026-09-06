import Post from "../models/PostModel.js";
import { successResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      author: req.user._id,
      content: req.body.content,
    });

    const postData = {
      id: post._id,
      content: post.content,
      image: post.image,
      author: {
        id: req.user._id,
        fullName: req.user.fullName,
        profilePicture: req.user.profilePicture,
      },
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      createdAt: post.createdAt,
    };

    return successResponse(res, 201, postData, "Post created successfully");
  } catch (error) {
    return handleControllerError(res, error);
  }
};
