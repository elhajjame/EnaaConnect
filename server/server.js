import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
dotenv.config({ path: ".env" });
import { Server } from "socket.io";
import { createServer } from "http";

const port = process.env.PORT || 3000;

const clientUrl = process.env.CLIENT_URL;

const httpServer = createServer(app);

//here is the websocket configured Server is a build in class of websocket.io || httpserver native http server by passing it I said to the socket
// look listen on the incomin http req on this server when u see a client Asking for a web socket take the connection
const io = new Server(httpServer, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

//here i took all the socket methos and store it inside express under the name io
app.set("io", io);

//socket is an object represent on client active connection it automaticly creates by socket.io
// internal engine so when a user connected socket.io pass the connection object to the callback function as a argement
io.on("connection", (socket) => {
  console.log(`socket connected ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`socket disconnected: ${socket.id} Reason: ${reason}`);
  });
});

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(port, () => {
      console.log(`server connected on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();
