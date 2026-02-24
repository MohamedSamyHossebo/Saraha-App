import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication, authorization } from "../../Middlewares/auth.middleware.js";
import { ROLE, TOKEN_TYPE_ENUM } from "../../Utils/enums/user.enum.js";
const router = Router();

router.get("/",
    authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }),
    authorization({ accessRoles: [ROLE.USER, ROLE.ADMIN] }),
    userService.profile
)

export default router;