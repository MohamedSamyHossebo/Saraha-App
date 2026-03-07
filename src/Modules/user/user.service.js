import successResponse from "../../Utils/response/success.response.js";
import { decrypt } from "../../Utils/security/encryption.security.js";
import * as dbService from "../../DB/database.repository.js";
import userModel from "../../DB/Models/User/user.model.js";
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
export const updateProfilePicture = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
    }
    const path = `uploads/${req.file.filename}`
    const user = await dbService.findByIdAndUpdate({
        model: userModel,
        id: req.user._id,
        update: { profileImage: path },
    })
    return successResponse({
        res, statusCode: 200,
        message: "Profile picture updated successfully",
        data: user
    });
}