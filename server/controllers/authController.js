import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";
import { errorResponse, successResponse } from "../responses/response.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// const handleControllerError = (res, error) => {
//   console.error(error);

//   if (error.code === 11000) {
//     return errorResponse(res, 409, "An account with this email already exists");
//   }

//   if (error.name === "ValidationError") {
//     const message = Object.values(error.errors)
//       .map((validationError) => validationError.message)
//       .join(", ");

//     return errorResponse(res, 400, message);
//   }

//   return errorResponse(res, 500, "Internal server error");
// };

export const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) {
      errorResponse(res, 400, "Passwords do not match");
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      confirmPassword,
      role,
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
          isVerified: newUser.isVerified,
        },
      },
      "The user has been created successfully",
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return errorResponse(res, 401, "Incorrect email or password");
    }

    const isCorrect = await user.comparePassword(password, user.password);

    if (!isCorrect) {
      return errorResponse(res, 401, "Incorrect email or password");
    }

    const token = generateToken(user._id);

    return successResponse(res, 200, { token }, "Login successful");
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error");
  }
};

export const forgetPassword = async (req, res) => {
  try {
    // 1) get the user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return errorResponse(
        res,
        404,
        "There is no user with this email address",
      );
    }

    // 2) generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) send the token to user email
    const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;
    const message = `You requested to reset your password. Please click the link below to create a new password: ${resetURL} If you did not request a password reset, please ignore this email. Your password will remain unchanged. This link is valid for a limited time.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "ENAA Connect - Password Reset (valid for 10 min)",
        message,
      });

      return successResponse(res, 200, {}, "Token sent to email");
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
    console.error(error);
    errorResponse(res, 500, "Internal server error");
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
    console.error(error);
    errorResponse(res, 500, "Internal server error");
  }
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
    console.error(error);
    return errorResponse(res, 500, "Internal server error");
  }
};
