import { errorResponse } from "../responses/response.js";
  import { createPostSchema } from "../zodValidations/postValidation.js";

  export const validateCreatePost = (req, res, next) => {
    const result = createPostSchema.safeParse(req.body);

    if (!result.success) {
      return errorResponse(res, 400, result.error.issues[0].message);
    }

    req.body = result.data;
    next();
  };