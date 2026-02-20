import express from "express";
import { PORT } from "./config/config.service.js";
import bootstrap from "./src/app.controller.js";
const app = express();
await bootstrap(app, express);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
