import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const authenticateSocket = async (socket, next) => {
  try {
    const authorizationHeader = socket.handshake.headers.authorization;

    let token = socket.handshake.auth?.token;

    if (!token && authorizationHeader?.startsWith("Bearer ")) {
      token = authorizationHeader.split(" ")[1];
    }
    console.log("token", token);
    if (!token) {
      return next(new Error("Authentication required"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new Error("User no longer exists"));
    }

    socket.user = user;

    next();
  } catch (error) {
    return next(new Error("Invalid or expired token"));
  }
};
export default authenticateSocket;
