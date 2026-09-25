import multer from "multer";
import { errorResponse } from "../responses/response.js";
const allowedImages = ["image/jpeg", "image/png", "image/webp"];

const postImageUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 3 * 1024 * 1024,
    files: 1,
    fields: 1,
  },

  fileFilter: (req, file, callback) => {
    if (!allowedImages.includes(file.mimetype)) {
      return callback(new Error("Only JPEG, PNG, and WebP images are allowed"));
    }
    callback(null, true);
  },
});

export const receivePostImages = (req, res, next) => {
  const receiveImages = postImageUpload.array("images", 1);

  receiveImages(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return errorResponse(res, 400, "post image cannot exceed 3 MB");
      }

      if (
        error.code === "LIMIT_FILE_COUNT" ||
        error.code === "LIMIT_UNEXPECTED_FILE"
      ) {
        console.log(error);
        return errorResponse(
          res,
          400,
          "A post can contain a maximum of 1 images",
        );
      }

      if (error.code === "LIMIT_FIELD_COUNT") {
        return errorResponse(
          res,
          400,
          "Only the content text field is accepted",
        );
      }

      return errorResponse(res, 400, "Invalid post upload");
    }

    if (error) {
      return errorResponse(res, 400, error.message);
    }
    next();
  });
};
