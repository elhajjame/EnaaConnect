// Netlify Server entrypoint: runs the EnaaConnect Express API + Socket.IO
// (code lives in ../server) on the same domain as the frontend.
import createHttpServer from "../../../server/createServer.js";
import { connectDBInBackground } from "../../../server/config/db.js";

export const config = {
  path: ["/api/*", "/socket.io/*"],
};

connectDBInBackground();

export default createHttpServer();
