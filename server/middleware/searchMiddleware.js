import { errorResponse } from "../responses/response.js";
import { userSearchSchema } from "../zodValidations/searchValidation.js";

export const validateUserSearch = (req, res, next) => {
  const result = userSearchSchema.safeParse(req.query);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.searchQuery = result.data;
  next();
};
