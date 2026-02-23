import * as dbService from "../../DB/database.repository.js";
import userModel from "../../DB/Models/User/user.model.js";
import successResponse from "../../Utils/response/success.response.js";
import { badRequest } from "../../Utils/response/error.response.js";
import { decrypt } from "../../Utils/security/encryption.security.js";
import { verifyToken } from "../../Utils/tokens/token.js";

export const profile = async (req, res) => {
    const { authorization } = req.headers;
    const decodedToken = verifyToken({ token: authorization });
    if (decodedToken.tokenType !== 'access') {
        throw badRequest({ res, message: "Invalid token type" });
    }
    const user = await dbService.findById({ model: userModel, id: decodedToken.id });
    if (user) {
        user.phoneNumber = await decrypt(user.phoneNumber);
    }
    return successResponse({ res, statusCode: 200, message: "User profile fetched successfully", data: user });

}