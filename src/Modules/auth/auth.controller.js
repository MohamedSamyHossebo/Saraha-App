import { Router } from "express";
import * as authService from "./auth.service.js";
const router=Router();

router.post("/signup",authService.createUser)
router.post("/login",authService.loginUser)

export default router;