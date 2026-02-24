import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication } from "../../Middlewares/auth.middleware.js";
import { TOKEN_TYPE_ENUM } from "../../Utils/enums/user.enum.js";
const router = Router();

router.get("/", authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }), userService.profile)
export default router;