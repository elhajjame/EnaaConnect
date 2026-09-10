import { errorResponse } from "../responses/response.js";
import {
  createEventSchema,
  eventParamsSchema,
  reviewEventSchema,
} from "../zodValidations/eventValidation.js";

export const validateCreateEvent = (req, res, next) => {
  const result = createEventSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};

export const validateEventParams = (req, res, next) => {
  const result = eventParamsSchema.safeParse(req.params);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.params = result.data;
  next();
};

export const validateReviewEvent = (req, res, next) => {
  const result = reviewEventSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, result.error.issues[0].message);
  }

  req.body = result.data;
  next();
};
