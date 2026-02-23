import userModel from "../../DB/Models/User/user.model.js";
import * as dbService from "../../DB/database.repository.js";
import { badRequest, conflict, notFound } from "../../Utils/response/error.response.js";
import successResponse from "../../Utils/response/success.response.js";
import { generateHash, verifyHash } from "../../Utils/security/hash.security.js";
import { securityEnum } from "../../Utils/enums/security.enum.js";
import { encrypt } from "../../Utils/security/encryption.security.js";
import { generateToken,verifyToken } from "../../Utils/tokens/token.js";
import { JWT_REFRESH_TOKEN_EXPIRES_IN, JWT_REFRESH_SECRET } from "../../../config/config.service.js";

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password, DOB, phoneNumber, gender } = req.body;
    if (!firstName || !lastName || !email || !password || !DOB || !phoneNumber || !gender) {
        throw badRequest(res, "All fields are required");
    }
    const existingUser = await dbService.findOne({ model: userModel, filter: { email } });
    if (existingUser) {
        throw conflict({ res, message: "User already exists" });
    }
    const encryptedData = await encrypt(phoneNumber);
    const hashedPassword = await generateHash({ plainText: password, algo: securityEnum.ARGON2 });
    const user = await dbService.create({ model: userModel, data: [{ firstName, lastName, email, password: hashedPassword, DOB, phoneNumber: encryptedData, gender }] });
    return successResponse({ res, statusCode: 201, message: "User created successfully", data: user });
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw badRequest({ res, message: "Email and password are required" });
    }
    const user = await dbService.findOne({ model: userModel, filter: { email } });
    if (!user) {
        throw notFound({ res, message: "User not found" });
    }
    const isPasswordValid = await verifyHash({ plainText: password, cipherText: user.password, algo: securityEnum.ARGON2 });
    if (!isPasswordValid) {
        throw badRequest({ res, message: "Invalid password" });
    }
    const accessToken = generateToken({ payload: { id: user._id, email: user.email } });
    const refreshToken = generateToken({ payload: { id: user._id, email: user.email }, secret: JWT_REFRESH_SECRET, options: { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN } });
    return successResponse({ res, statusCode: 200, message: "User logged in successfully", data: { accessToken, refreshToken } });

}

export const refreshToken = async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw badRequest({ res, message: "Authorization header is required" });
    }
    const decodedToken = verifyToken({ token: authorization, secret: JWT_REFRESH_SECRET });
    const user = await dbService.findById({ model: userModel, id: decodedToken.id });
    if (!user) {
        throw notFound({ res, message: "User not found" });
    }
    const accessToken = generateToken({ payload: { id: user._id, email: user.email } });
    return successResponse({ res, statusCode: 200, message: "Access token refreshed successfully", data: { accessToken } });
}