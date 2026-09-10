import { errorResponse } from "../responses/response.js";

export const requireStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return errorResponse(res, 403, "Only students can perform this action");
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return errorResponse(
      res,
      403,
      "Only administrators can perform this action",
    );
  }
  next();
};
