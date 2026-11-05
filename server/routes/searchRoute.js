import { Router } from "express";
import { searchUsers } from "../controllers/searchController.js";
import protect from "../middleware/protectMiddleware.js";
import { validateUserSearch } from "../middleware/searchMiddleware.js";

const route = Router();

route.get("/users", protect, validateUserSearch, searchUsers);

export default route;
