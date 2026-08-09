import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

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
