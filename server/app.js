import express from "express";
import morgan from "morgan";
import authRoute from "./routes/userRoute.js";
import profileRoute from "./routes/profileRoute.js";
import postRoute from "./routes/postRoute.js";
import eventRoute from "./routes/eventRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import searchRoute from "./routes/searchRoute.js";

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    ...(process.env.CLIENT_URL || "")
      .split(",")
      .map((allowedOrigin) => allowedOrigin.trim())
      .filter(Boolean),
    "http://localhost:5173",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization,Content-Type",
    );
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(
      origin && allowedOrigins.includes(origin) ? 204 : 403,
    );
  }

  next();
});

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/users", profileRoute);
app.use("/api/posts", postRoute);
app.use("/api/events", eventRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/search", searchRoute);

app.get("/", (req, res) => {
  res.send("api is working");
});

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});
export default app;
