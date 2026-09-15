import { notificationParamsSchema } from "../zodValidations/notificationValidation.js";
import { errorResponse } from "../responses/response.js";

export const validateNotificationParams = (req, res, next) => {
  const result = notificationParamsSchema.safeParse(req.params);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.params = result.data;
  next();
};
