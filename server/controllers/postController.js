import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";
import { errorResponse, successResponse } from "../responses/response.js";
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
        fieldOfStudy: req.user.fieldOfStudy,
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

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "fullName profilePicture fieldOfStudy");

    const postData = posts.map((post) => {
      return {
        id: post._id,
        content: post.content,
        image: post.image,
        author: post.author
          ? {
              id: post.author._id,
              fullName: post.author.fullName,
              profilePicture: post.author.profilePicture,
              fieldOfStudy: post.author.fieldOfStudy,
            }
          : null,
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
        createdAt: post.createdAt,
      };
    });
    return successResponse(res, 200, postData, "Posts retrieved successfully");
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = req.post;

    post.content = req.body.content;
    await post.save();

    const postData = {
      id: post._id,
      content: post.content,
      image: post.image,
      author: {
        id: req.user._id,
        fullName: req.user.fullName,
        profilePicture: req.user.profilePicture,
        fieldOfStudy: req.user.fieldOfStudy,
      },
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      createdAt: post.createdAt,
    };

    return successResponse(res, 200, postData, "Post updated successfully");
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = req.post;

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    return successResponse(
      res,
      200,
      {
        id: post._id,
      },
      "Post deleted successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const togglePostLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }

    const likeIndex = post.likes.findIndex((userId) => {
      return userId.equals(req.user._id);
    });

    let liked;

    if (likeIndex === -1) {
      post.likes.push(req.user._id);
      liked = true;
    } else {
      post.likes.splice(likeIndex, 1);
      liked = false;
    }

    await post.save();

    const message = liked
      ? "Post liked successfully"
      : "Post unliked successfully";

    return successResponse(
      res,
      200,
      {
        postId: post._id,
        liked,
        likesCount: post.likes.length,
      },
      message,
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};
