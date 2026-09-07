import { errorResponse } from "../responses/response.js";
  import { createPostSchema, postParamsSchema, updatePostSchema } from "../zodValidations/postValidation.js";

  export const validateCreatePost = (req, res, next) => {
    const result = createPostSchema.safeParse(req.body);

    if (!result.success) {
      return errorResponse(res, 400, result.error.issues[0].message);
    }

    req.body = result.data;
    next();
  };

   export const validatePostParams = (req, res, next) => {
    const result = postParamsSchema.safeParse(req.params);

    if (!result.success) {
      return errorResponse(res, 400, result.error.issues[0].message);
    }

    req.params = result.data;
    next();
  };

  export const validateUpdatePost = (req, res, next) => {
    const result = updatePostSchema.safeParse(req.body);

    if (!result.success) {
      return errorResponse(res, 400, result.error.issues[0].message);
    }

    req.body = result.data;
    next();
  };