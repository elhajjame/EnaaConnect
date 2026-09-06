import express from "express";
import morgan from "morgan";
import authRoute from "./routes/userRoute.js";
import profileRoute from "./routes/profileRoute.js";
import postRoute from "./routes/postRoute.js";
const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/users", profileRoute);
app.use("/api/posts", postRoute);

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
