import { Router } from "express";
import {
  forgetPassword,
  getMe,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";
import protect from "../middleware/protectMiddleware.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.post("/forget-password", forgetPassword);
route.patch("/reset-password/:token", resetPassword);

route.get("/me",protect,getMe );


export default route;
