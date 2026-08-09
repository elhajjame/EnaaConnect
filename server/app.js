import express from "express";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";
const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("api is working");
});

app.all("*splat", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find ${req.originalUrl} on this server!`,
  });
  next();
});

export default app;
