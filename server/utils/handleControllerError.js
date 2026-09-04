import { errorResponse } from "../responses/response.js";

const handleControllerError = (res, req) => {
  console.error(error);

  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(", ");

    return errorResponse(res, 400, message);
  }
  if (error.name === "CastError") {
    return errorResponse(res, 400, "Invalid ID");
  }

  if (error.code === 11000) {
    return errorResponse(res, 409, "This value already exists");
  }
  
  return errorResponse(res, 500, "Internal server error");
};
export default handleControllerError;
