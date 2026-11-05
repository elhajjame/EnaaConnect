import User from "../models/UserModel.js";
import { successResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";

const makeSearchPattern = (value) => {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escapedValue, "i");
};

export const searchUsers = async (req, res) => {
  try {
    const { q, field } = req.searchQuery;
    const filters = { role: "student" };
    if (q) {
      filters.fullName = makeSearchPattern(q);
    }

    if (field) {
      filters.fieldOfStudy = makeSearchPattern(field);
    }

    const users = await User.find(filters).select(
      "fullName profilePicture fieldOfStudy",
    );

    const results = users.map((user) => ({
      id: user._id,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      fieldOfStudy: user.fieldOfStudy,
    }));

    return successResponse(res, 200, results, "Students search completed");
  } catch (error) {
    return handleControllerError(res, error);
  }
};
