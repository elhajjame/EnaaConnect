import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post author is required"],
    },

    content: {
      type: String,
      trim: true,
      maxlength: [2000, "Post content cannot exceed 2000 characters"],
      default: "",
    },

    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images) => images.length <= 1,
        message: "A post cannot contain more than 1 image",
      },
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
