import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";
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

export const forgotPassword = async (req, res) => {
  try {
    const responseMessage =
      "If an account exists for this email, a password reset link has been sent";

    // 1) get the user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return successResponse(res, 200, {}, responseMessage);
    }

    // 2) generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) send the token to user email
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `You requested to reset your password. Please click the link below to create a new password: ${resetURL} If you did not request a password reset, please ignore this email. Your password will remain unchanged. This link is valid for a limited time.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "ENAA Connect - Password Reset (valid for 1 hour)",
        message,
      });

      return successResponse(res, 200, {}, responseMessage);
    } catch (error) {
      console.error("EMAIL ERROR:", error);

      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return errorResponse(
        res,
        500,
        "There was an error sending the email, try again later",
      );
    }
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    // 1) get the user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) if token has not expired and there is a user, set the new password
    if (!user) {
      return errorResponse(res, 400, "Token is invalid or has expired");
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // 3) log the user in and send JWT
    const token = generateToken(user._id);
    return successResponse(res, 200, { token }, "Password reset successfully");
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
