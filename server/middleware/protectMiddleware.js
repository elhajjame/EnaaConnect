import jwt from "jsonwebtoken";
import { errorResponse } from "../responses/response.js";
import User from "../models/UserModel.js";

export const protect = async (req, res, next) => {
  let token, decoded;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return errorResponse(
        res,
        401,
        "You are not logged in. Please log in to get access",
      );
    }

    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 401, "Invalid token. Please log in again");
  }

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return errorResponse(
      res,
      401,
      "The user belonging to this token no longer exists",
    );
  }
  req.user = freshUser;
  next();
};

export default protect;
