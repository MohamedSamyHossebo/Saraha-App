import { badRequest } from "../../Utils/response/error.response.js";
import successResponse from "../../Utils/response/success.response.js";
import { decrypt } from "../../Utils/security/encryption.security.js";
import * as dbService from "../../DB/database.repository.js";
import userModel from "../../DB/Models/User/user.model.js";
import cloudinary from "../../../config/cloudinary.js";
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
        throw badRequest({ res, message: "Please upload an image" });
    }
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
        req.file.path,
        { folder: `Saraha-App/User/profile` }
    );
    const user = await dbService.findByIdAndUpdate({
        model: userModel,
        id: req.user._id,
        update: { profileImage: { secure_url, public_id } },
    })
    return successResponse({
        res, statusCode: 200,
        message: "Profile picture updated successfully",
        data: user
    });
}