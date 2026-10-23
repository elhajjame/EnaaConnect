import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { errorResponse, successResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(
        res,
        409,
        "An account with this email already exists",
      );
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      confirmPassword,
      role: "student",
    });

    const token = generateToken(newUser._id);

    return successResponse(
      res,
      201,
      {
        token,
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
      },
      "Account created successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return errorResponse(res, 401, "Incorrect email or password");
    }

    const passwordIsCorrect = await user.comparePassword(
      password,
      user.password,
    );

    if (!passwordIsCorrect) {
      return errorResponse(res, 401, "Incorrect email or password");
    }

    const token = generateToken(user._id);

    return successResponse(
      res,
      200,
      {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      "Login successful",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const logOut = (req, res) => {
  return successResponse(res, 200, {}, "Logged out successfully");
};

export const getMe = (req, res) => {
  try {
    const {
      _id,
      fullName,
      email,
      role,
      profilePicture,
      fieldOfStudy,
      biography,
      interests,
    } = req.user;

    const safeUser = {
      _id,
      fullName,
      email,
      role,
      profilePicture,
      fieldOfStudy,
      biography,
      interests,
    };

    return successResponse(res, 200, safeUser, "User retrieved successfully");
  } catch (error) {
    return handleControllerError(res, error);
  }
};
