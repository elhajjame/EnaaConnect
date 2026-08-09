import Post from "../models/PostModel";
import route from "../routes/authRoute";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

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
