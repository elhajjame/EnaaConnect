import Post from "../models/PostModel.js";
import route from "../routes/authRoute.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createPost = catchAsync(async (req, res, next) => {
  const { content, image } = req.body;

  if (!content) {
    return next(new AppError("Post content is required", 400));
  }

  const post = Post.create({
    author: req.user_id,
    content,
    image,
  });

  res.status(201).json({
    status: "success",
    data: {
      post,
    },
  });
});
