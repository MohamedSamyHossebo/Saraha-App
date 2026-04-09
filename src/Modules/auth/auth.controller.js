import { Router } from "express";
import * as authService from "./auth.service.js";
import { authentication } from "../../Middlewares/auth.middleware.js";
import { TOKEN_TYPE_ENUM } from "../../Utils/enums/user.enum.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { signUpSchema, loginSchema, confirmEmailSchema, resendOtpSchema,resetPasswordSchema,updatePasswordSchema } from "./auth.validation.js";
import { localFileUpload } from "../../Middlewares/multer.middleware.js";
const router = Router();

router.post("/signup", localFileUpload().single("profileImage"), validationMiddleware(signUpSchema), authService.createUser)
router.patch("/confirm-email", validationMiddleware(confirmEmailSchema), authService.confirmEmail)
router.patch("/resend-otp", validationMiddleware(resendOtpSchema), authService.resendOtp)
router.post("/forget-password", validationMiddleware(resendOtpSchema), authService.forgetPassword)
router.patch("/reset-password", validationMiddleware(resetPasswordSchema), authService.resetPassword)
router.patch("/change-password", authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }), validationMiddleware(updatePasswordSchema), authService.changePassword)
router.post("/login", validationMiddleware(loginSchema), authService.loginUser)
router.post("/logout", authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }), authService.logoutUser)
router.post("/refresh-token", authentication({ tokenType: TOKEN_TYPE_ENUM.REFRESH }), authService.refreshToken)
router.post("/google-login", authService.googleLogin)

export default router;