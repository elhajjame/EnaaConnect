import { errorResponse } from "../responses/response.js";

const enaaEmailPattern = /^[a-zA-Z0-9._%+-]+@enaa\.ma$/i;
const validateRegisterEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return errorResponse(res, 400, "ENAA email is required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!enaaEmailPattern.test(normalizedEmail)) {
    return errorResponse(
      res,
      400,
      "Registration requires a valid @enaa.ma email address",
    );
  }

  req.body.email = normalizedEmail;
  next();
};
export default validateRegisterEmail;
