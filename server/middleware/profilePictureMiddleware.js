import multer from "multer";
import { errorResponse } from "../responses/response.js";

const allowedImages = ["image/jpeg", "image/png", "image/webp"];
const multerUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
  },

  fileFilter: (req, file, callback) => {
    if (!allowedImages.includes(file.mimetype)) {
      return callback(new Error("Only JPEG, PNG, and WebP images are allowed"));
    }
    callback(null, true);
  },
});

export const receiveProfilePicture = (req, res, next) => {
  const receiveSingleImage = multerUpload.single("profilePicture");

  receiveSingleImage(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return errorResponse(res, 400, "Profile picture cannot exceed 5 MB");
      }
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return errorResponse(
          res,
          400,
          "Send one image using the profilePicture field",
        );
      }
    }
    if (error) {
      return errorResponse(res, 400, error.message);
    }
    next();
  });
};

export const validateProfilePicture = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    return errorResponse(res, 400, "This route only accepts a profile picture");
  }

  if (!req.file) {
    return errorResponse(res, 400, "Profile picture is required");
  }
  
  next();
};
