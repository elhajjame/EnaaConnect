import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./middleware/errorMiddleware.js";
import authRoute from "./routes/authRoute.js";
const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("api is working");
});

app.all("*splat", (req, res, next) => {
  const err = new Error(`can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 400;

  next(err);
});

app.use(globalErrorHandler);
export default app;
