import { errorResponse } from "../responses/response.js";
import { publicProfileParamsSchema, updateProfileSchema } from "../zodValidations/profileValidationMiddleware.js";

export const validateProfileUpdate = (req, res, next) => {
  const result = updateProfileSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};

export const validatePublicProfileParams = (req, res, next) => {
  const result = publicProfileParamsSchema.safeParse(req.params);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.params.userId = result.data.userId;
  next();
};
