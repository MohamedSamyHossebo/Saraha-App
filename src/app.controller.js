import connectDB from "./DB/connection.js";
import { authRouter, userRouter, messageRouter } from "./Modules/index.js";
import {
  badRequest,
  globalErrorHandler,
} from "./Utils/response/error.response.js";
import connectRedis from "./DB/redis.connection.db.js";
import cors from "cors";
import helmet from "helmet";
import limiter from "./Utils/limiter/rateLimit.util.js";
import morgan from "morgan";


const bootstrap = async (app, express) => {
  app.use(express.json(), cors(), helmet(),morgan("combined"));
  app.use(limiter)
  app.use(express.static("public"));
  app.use("/uploads", express.static("./src/uploads"));
  await connectDB();
  await connectRedis();
  app.get("/", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Sara7a backend is running",
    });
  });
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
  app.all("/*dummy", (req, res) => {
    throw badRequest({ message: "Route not found" });
  });
  app.use(globalErrorHandler);
};
export default bootstrap;
