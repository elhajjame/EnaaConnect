import User from "../models/UserModel.js";
import { errorResponse, successResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";
import { uploadProfilePicToCloudinary } from "../utils/cloudinary.js";

export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
      role: "student",
    }).select(
      "fullName profilePicture fieldOfStudy academicYear biography interests ",
    );
    if (!user) {
      return errorResponse(res, 404, "Student not found");
    }
    const publicProfile = {
      id: user._id,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      fieldOfStudy: user.fieldOfStudy,
      academicYear: user.academicYear,
      biography: user.biography,
      interests: user.interests,
    };

    return successResponse(
      res,
      200,
      publicProfile,
      "Profile retrieved successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return errorResponse(res, 404, "User not found");
    }

    const profileData = {
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePicture: updatedUser.profilePicture,
      fieldOfStudy: updatedUser.fieldOfStudy,
      academicYear: updatedUser.academicYear,
      biography: updatedUser.biography,
      interests: updatedUser.interests,
    };

    return successResponse(
      res,
      200,
      profileData,
      "Profile updated successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};
export const updateProfilePicture = async (req, res) => {
  try {
    const result = await uploadProfilePicToCloudinary(
      req.file.buffer,
      req.user._id.toString(),
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePicture: result.secure_url,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      return errorResponse(res, 404, "User not found");
    }

    const profileData = {
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePicture: updatedUser.profilePicture,
      fieldOfStudy: updatedUser.fieldOfStudy,
      academicYear: updatedUser.academicYear,
      biography: updatedUser.biography,
      interests: updatedUser.interests,
    };

    return successResponse(
      res,
      200,
      profileData,
      "Profile picture updated successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};
