import { errorResponse } from "../responses/response.js";
import {
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  resetPasswordTokenSchema,
} from "../zodValidations/authValidation.js";

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

export const validateForgetPassword = (req, res, next) => {
  const result = forgetPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};

export const validateResetPassword = (req, res, next) => {
  const result = resetPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};

export const validateResetPasswordToken = (req, res, next) => {
  const result = resetPasswordTokenSchema.safeParse(req.params);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.params = result.data;
  next();
};
