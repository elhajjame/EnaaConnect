import { errorResponse } from "../responses/response.js";
import { createEventSchema } from "../zodValidations/eventValidation.js";

export const validateCreateEvent = (req, res, next) => {
  const result = createEventSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};
