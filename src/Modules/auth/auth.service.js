import userModel from "../../DB/Models/User/user.model.js";
import * as dbService from "../../DB/database.repository.js";
import {
  badRequest,
  conflict,
  notFound,
} from "../../Utils/response/error.response.js";
import successResponse from "../../Utils/response/success.response.js";
import {
  generateHash,
  verifyHash,
} from "../../Utils/security/hash.security.js";
import { securityEnum } from "../../Utils/enums/security.enum.js";
import { encrypt } from "../../Utils/security/encryption.security.js";
import { getNewLoginCredentials } from "../../Utils/tokens/token.js";
import { OAuth2Client } from "google-auth-library";
import { PROVIDER } from "../../Utils/enums/user.enum.js";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, DOB, phoneNumber, gender } =
    req.body;
  const existingUser = await dbService.findOne({
    model: userModel,
    filter: { email },
  });
  if (existingUser) {
    throw conflict({ res, message: "User already exists" });
  }
  const encryptedData = await encrypt(phoneNumber);
  const hashedPassword = await generateHash({
    plainText: password,
    algo: securityEnum.ARGON2,
  });
  const user = await dbService.create({
    model: userModel,
    data: [
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        DOB,
        phoneNumber: encryptedData,
        gender,
      },
    ],
  });
  return successResponse({
    res,
    statusCode: 201,
    message: "User created successfully",
    data: user,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw badRequest({ res, message: "Email and password are required" });
  }
  const user = await dbService.findOne({ model: userModel, filter: { email } });
  if (!user) {
    throw notFound({ res, message: "User not found" });
  }
  const isPasswordValid = await verifyHash({
    plainText: password,
    cipherText: user.password,
    algo: securityEnum.ARGON2,
  });
  if (!isPasswordValid) {
    throw badRequest({ res, message: "Invalid password" });
  }
  const credentials = await getNewLoginCredentials(user);
  return successResponse({
    res,
    statusCode: 200,
    message: "User logged in successfully",
    data: credentials,
  });
};

export const refreshToken = async (req, res) => {
  const user = req.user;
  console.log(user);
  const credentials = await getNewLoginCredentials(user);
  return successResponse({
    res,
    statusCode: 200,
    message: "Access token refreshed successfully",
    data: credentials,
  });
};

export const verifyGoogle = async ({ idToken }) => {
  const OAuth = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await OAuth.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { email, name } = payload;
  let user = await dbService.findOne({ model: userModel, filter: { email } });
  if (!user) {
    user = await dbService.create({
      model: userModel,
      data: {
        email,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      },
    });
  }
  return user;
};

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  const { email, given_name, family_name, email_verified, picture } =
    await verifyGoogle({ idToken });
  if (!email_verified) {
    throw badRequest({ res, message: "Email not verified" });
  }
  const user = await dbService.findOne({ model: userModel, filter: { email } });
  if (user) {
    if (user.provider === PROVIDER.GOOGLE) {
      const credentials = await getNewLoginCredentials(user);
      return successResponse({
        res,
        statusCode: 200,
        message: "User logged in successfully",
        data: credentials,
      });
    }
    throw badRequest({ res, message: "Email already registered" });
  }
  const newUser = await dbService.create({
    model: userModel,
    data: [
      {
        email,
        firstName: given_name,
        lastName: family_name,
        profilePic: picture,
        provider: PROVIDER.GOOGLE,
      },
    ],
  });
  const credentials = await getNewLoginCredentials(newUser);
  return successResponse({
    res,
    statusCode: 201,
    message: "User logged in successfully",
    data: credentials,
  });
};
