import * as dbService from "../../DB/database.repository.js";
import userModel from "../../DB/Models/User/user.model.js";
import successResponse from "../../Utils/response/success.response.js";
import { decrypt } from "../../Utils/security/encryption.security.js";
export const profile = async (req, res) => {
    const { id } = req.params;
    const user = await dbService.findById({ model: userModel, id });
    if (user) {
        user.phoneNumber = await decrypt(user.phoneNumber);
    }
    return successResponse({ res, statusCode: 200, message: "User profile fetched successfully", data: user });

}