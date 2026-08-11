import { Router } from "express";
import {
  forgetPassword,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.post("/forget-password", forgetPassword);
route.patch("/reset-password/:token", resetPassword);
export default route;
