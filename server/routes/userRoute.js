import { Router } from "express";
import {
  forgotPassword,
  getMe,
  login,
  logOut,
  register,
  resetPassword,
} from "../controllers/authController.js";
import protect from "../middleware/protectMiddleware.js";
import {
  validateForgetPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateResetPasswordToken,
} from "../middleware/authMiddleware.js";

const route = Router();

route.post("/register", validateRegister, register);
route.post("/login", validateLogin, login);
route.post("/logout", protect, logOut);

route.post("/forgot-password", validateForgetPassword, forgotPassword);
route.patch(
  "/reset-password/:token",
  validateResetPasswordToken,
  validateResetPassword,
  resetPassword,
);

route.get("/me", protect, getMe);

export default route;
