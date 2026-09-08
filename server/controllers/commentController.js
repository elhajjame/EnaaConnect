import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";
import { errorResponse, successResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";

export const createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }

    const comment = await Comment.create({
      post: post._id,
      author: req.user._id,
      content: req.body.content,
    });

    post.comments.push(comment._id);

    await post.save();

    const commentData = {
      id: comment._id,
      postId: post._id,
      content: comment.content,
      author: {
        id: req.user._id,
        fullName: req.user.fullName,
        profilePicture: req.user.profilePicture,
        fieldOfStudy: req.user.fieldOfStudy,
      },
      createdAt: comment.createdAt,
      commentsCount: post.comments.length,
    };

    return successResponse(
      res,
      201,
      commentData,
      "Comment created successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }

    const comments = await Comment.find({ post: post._id })
      .sort({ createdAt: 1 })
      .populate("author", "fullName profilePicture fieldOfStudy");

    const commentData = comments.map((comment) => {
      return {
        id: comment._id,
        postId: comment.post,
        content: comment.content,
        author: comment.author
          ? {
              id: comment.author._id,
              fullName: comment.author.fullName,
              profilePicture: comment.author.profilePicture,
              fieldOfStudy: comment.author.fieldOfStudy,
            }
          : null,
        createdAt: comment.createdAt,
      };
    });

    return successResponse(
      res,
      200,
      {
        comments: commentData,
        commentsCount: commentData.length,
      },
      "Comments retrieved successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};
