import { Router } from "express";
import { getMe, login, logOut, register } from "../controllers/authController.js";
import protect from "../middleware/protectMiddleware.js";
import { validateLogin, validateRegister } from "../middleware/authMiddleware.js";

const route = Router();

route.post("/register", validateRegister, register);
route.post("/login", validateLogin, login);
route.post("/logout", protect, logOut);

route.get("/me", protect, getMe);

export default route;
