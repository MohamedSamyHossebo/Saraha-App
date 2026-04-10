import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication, authorization } from "../../Middlewares/auth.middleware.js";
import { ROLE, TOKEN_TYPE_ENUM } from "../../Utils/enums/user.enum.js";
import { localFileUpload } from "../../Middlewares/multer.middleware.js";
const router = Router();

router.get("/",
    authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }),
    authorization({ accessRoles: [ROLE.USER, ROLE.ADMIN] }),
    userService.profile
)
router.patch("/update-profile-picture",
    authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }),
    authorization({ accessRoles: [ROLE.USER, ROLE.ADMIN] }),
    localFileUpload().single("profileImage"),
    userService.updateProfilePicture
)
router.patch("/update-cover-picture",
    authentication({ tokenType: TOKEN_TYPE_ENUM.ACCESS }),
    authorization({ accessRoles: [ROLE.USER, ROLE.ADMIN] }),
    localFileUpload().array("coverImage", 5),
    userService.updateCoverPicture
)
export default router;