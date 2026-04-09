import { Router } from "express";
import {
  authentication,
  authorization,
} from "../../Middlewares/auth.middleware.js";
import { ROLE, TOKEN_TYPE_ENUM } from "../../Utils/enums/user.enum.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { sendMessageSchema } from "./message.validation.js";
import * as messageService from "./message.service.js";
const router = Router();

router.post(
  "/send-message/:receiverId",
  validationMiddleware(sendMessageSchema),
  messageService.sendMessage,
);
router.get(
  "/get-messages",
  authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }),
  authorization({ accessRoles: [ROLE.USER] }),
  messageService.getMessages,
);

export default router;
