import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = catchAsync(async (req, res, next) => {
  const { fullName, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }
  const newUser = await User.create({
    fullName,
    email,
    password,
    confirmPassword,
    role,
  });
  const token = generateToken(newUser._id);
  res.status(201).json({ status: "success", token, data: { user: newUser } });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("incorrect email or password", 400));
  }

  const isCorrect = await user.comparePassword(password, user.password);

  if (!isCorrect) {
    return next(new AppError("incorrect email or password", 400));
  }

  const token = generateToken(user._id);

  res.status(200).json({ status: "success", token });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  // 1) get the user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with this email address", 404));
  }
  // 2)generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //3) send the token to user email
  const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;
  const message = `You requested to reset your password. Please click the link below to create a new password: ${resetURL} If you did not request a password reset, please ignore this email. Your password will remain unchanged. This link is valid for a limited time.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ENAA Connect - Password Reset (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "token sent to email!",
    });
  } catch (error) {
    console.log("EMAIL ERROR:", error);

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the mail, try again later", 500),
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) get the user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2) if token has no expired and theres user set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  // 3) update changedPasswordAt property for the user

  // 4) log the user in and send JWT
  const token = generateToken(user._id);
  res.status(201).json({ status: "success", token });
});
