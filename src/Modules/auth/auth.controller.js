import { Router } from "express";
import * as authService from "./auth.service.js";
import { authentication } from "../../Middlewares/auth.middleware.js";
import { TOKEN_TYPE_ENUM } from "../../Utils/enums/user.enum.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { signUpSchema, loginSchema } from "./auth.validation.js";
import { localFileUpload } from "../../Utils/mutler/local.multer.js";
const router = Router();

router.post("/signup", localFileUpload().single("profileImage"), validationMiddleware(signUpSchema), authService.createUser)
router.post("/login", validationMiddleware(loginSchema), authService.loginUser)
router.post("/refresh-token", authentication({ tokenType: TOKEN_TYPE_ENUM.REFRESH }), authService.refreshToken)
router.post("/google-login", authService.googleLogin)

export default router;