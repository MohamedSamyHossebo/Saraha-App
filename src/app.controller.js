import { authRouter, userRouter, messageRouter } from "./Modules/index.js"
import { badRequest, globalErrorHandler } from "./Utils/response/error.response.js";

const bootstrap = async (app, express) => {
    app.use(express.json())

    app.get("/", (req, res) => {
        res.status(200).json({
            status: "success",
            message: "Sara7a backend is running",
        });
    });


    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/message", messageRouter)

    app.all("/*dummy", (req, res) => {
       throw badRequest ({ message: "Route not found" })

    });
    app.use(globalErrorHandler);
}
export default bootstrap