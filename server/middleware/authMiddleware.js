import { errorResponse } from "../responses/response.js";
import { loginSchema, registerSchema } from "../zodValidations/authValidation.js";

export const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};

export const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};
