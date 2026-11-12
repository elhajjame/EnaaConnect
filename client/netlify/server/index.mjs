// Netlify Server entrypoint: runs the EnaaConnect Express API + Socket.IO
// (code lives in ../server) on the same domain as the frontend.
//
// mongoose and socket.io are imported from server/node_modules on purpose so
// they are the exact same instances the API's models and routes use.
// The build command in netlify.toml installs those dependencies.
import { createServer } from "node:http";
import mongoose from "../../../server/node_modules/mongoose/index.js";
import { Server } from "../../../server/node_modules/socket.io/dist/index.js";
import app from "../../../server/app.js";
import authenticateSocket from "../../../server/middleware/socketAuthMiddleware.js";

export const config = {
  path: ["/api/*", "/socket.io/*"],
};

// Connect to MongoDB Atlas without blocking startup; Mongoose buffers
// queries until the connection is ready.
if (!process.env.CONNECT_DB) {
  console.error("CONNECT_DB environment variable is not set");
} else {
  mongoose
    .connect(process.env.CONNECT_DB, { serverSelectionTimeoutMS: 8000 })
    .then(() => console.log("Database connected successfully"))
    .catch((error) =>
      console.error("Database connection failed:", error.message),
    );
}

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

app.set("io", io);

io.use(authenticateSocket);
io.on("connection", (socket) => {
  socket.join(`user:${socket.user._id.toString()}`);
});

export default httpServer;
