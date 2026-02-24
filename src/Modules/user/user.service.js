import successResponse from "../../Utils/response/success.response.js";
import { decrypt } from "../../Utils/security/encryption.security.js";


export const profile = async (req, res) => {
    if (req.user) {
        req.user.phoneNumber = await decrypt(req.user.phoneNumber)
    }
    return successResponse({
        res, statusCode: 200,
        message: "User profile fetched successfully",
        data: req.user
    });
}