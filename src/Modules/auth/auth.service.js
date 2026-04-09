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
import authEnum from "../../Utils/enums/auth.enum.js";
import { encrypt } from "../../Utils/security/encryption.security.js";
import {
  getNewLoginCredentials,
  createRevokeToken,
} from "../../Utils/tokens/token.js";
import { OAuth2Client } from "google-auth-library";
import { PROVIDER } from "../../Utils/enums/user.enum.js";
import * as redisService from "../../services/index.js";
import { keys, del, baseRevokeTokenKey } from "../../services/index.js";

import { emailEmitter } from "../../Utils/events/email.events.js";
import { generateOtp } from "../../Utils/security/otp.security.js";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, DOB, phoneNumber, gender } =
    req.body;
  const profileImage = req.file?.path;
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
  const otp = generateOtp();
  const hashedOtp = await generateHash({
    plainText: otp,
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
        profileImage,
        isActive: false,
        confirmEmailOtp: hashedOtp,
      },
    ],
  });
  //  OTP Event
  emailEmitter.emit("confirmEmail", { email, otp });

  return successResponse({
    res,
    statusCode: 201,
    message: "User created successfully",
    data: user,
  });
};
export const confirmEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await dbService.findOne({
    model: userModel,
    filter: {
      email,
      confirmEmail: { $exists: false },
      confirmEmailOtp: { $exists: true },
    },
  });
  if (!user) {
    throw notFound({ res, message: "User not found" });
  }
  const isOtpValid = await verifyHash({
    plainText: otp,
    cipherText: user.confirmEmailOtp,
    algo: securityEnum.ARGON2,
  });
  if (!isOtpValid) {
    throw badRequest({ res, message: "Invalid OTP" });
  }
  await dbService.updateOne({
    model: userModel,
    filter: { email },
    update: {
      isActive: true,
      confirmEmail: Date.now(),
      $unset: { confirmEmailOtp: true },
    },
  });
  emailEmitter.emit("confirmEmailSuccess", { email, name: user.firstName });
  return successResponse({
    res,
    statusCode: 200,
    message: "Email confirmed successfully",
    data: user,
  });
};
// Expiration time
// Max resend OTP 3 times using redis
export const resendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await dbService.findOne({
    model: userModel,
    filter: {
      email,
      confirmEmail: { $exists: false },
      confirmEmailOtp: { $exists: true },
    },
  });
  if (!user) {
    throw notFound({ res, message: "User not found" });
  }
  const otp = generateOtp();
  const hashedOtp = await generateHash({
    plainText: otp,
    algo: securityEnum.ARGON2,
  });
  const otpCountKey = `otp:${email}`;
  const getOtpCount = await redisService.incr({ key: otpCountKey });
  if (getOtpCount === 1) {
    await redisService.expire({ key: otpCountKey, ttl: 60 * 60 * 24 });
  }
  if (getOtpCount > 3) {
    throw badRequest({ res, message: "Max resend OTP 3 times" });
  }
  await dbService.updateOne({
    model: userModel,
    filter: { email },
    update: {
      confirmEmailOtp: hashedOtp,
    },
  });
  emailEmitter.emit("confirmEmail", { email, otp });
  return successResponse({
    res,
    statusCode: 200,
    message: "OTP resent successfully check your email",
  });
};
//
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  const hashedOtp = await generateHash({
    plainText: otp,
    algo: securityEnum.ARGON2,
  });
  const user = await dbService.findOneAndUpdate({
    model: userModel,
    filter: {
      email,
      confirmEmail: { $exists: true },
      provider: PROVIDER.SYSTEM,
    },
    update: {
      forgetPasswordOtp: hashedOtp,
    },
  });
  if (!user) {
    throw notFound({ res, message: "User not found" });
  }
  emailEmitter.emit("forgetPassword", { email, otp });
  return successResponse({
    res,
    statusCode: 200,
    message: "Check your email for the OTP",
  });
};
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    throw badRequest({ res, message: "Passwords do not match" });
  }
  const user = await dbService.findOne({
    model: userModel,
    filter: {
      email,
      confirmEmail: { $exists: true },
      forgetPasswordOtp: { $exists: true },
      provider: PROVIDER.SYSTEM,
    },
  });
  if (!user) {
    throw notFound({ res, message: "User not found" });
  }
  const isOtpValid = await verifyHash({
    plainText: otp,
    cipherText: user.forgetPasswordOtp,
    algo: securityEnum.ARGON2,
  });
  if (!isOtpValid) {
    throw badRequest({ res, message: "Invalid OTP" });
  }
  const hashedPassword = await generateHash({
    plainText: newPassword,
    algo: securityEnum.ARGON2,
  });
  await dbService.updateOne({
    model: userModel,
    filter: { email },
    update: {
      password: hashedPassword,
      $unset: { forgetPasswordOtp: true },
    },
  });
  emailEmitter.emit("resetPassword", { email, name: user.firstName });
  return successResponse({
    res,
    statusCode: 200,
    message: "Password reset successfully",
  });
};
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    throw badRequest({ res, message: "Passwords do not match" });
  }
  const user = await dbService.findOne({
    model: userModel,
    filter: {
      email: req.user.email,
      confirmEmail: { $exists: true },
      provider: PROVIDER.SYSTEM,
    },
  });
  if (!user) {
    throw notFound({ res, message: "User not found" });
  }
  const isPasswordValid = await verifyHash({
    plainText: oldPassword,
    cipherText: user.password,
    algo: securityEnum.ARGON2,
  });
  if (!isPasswordValid) {
    throw badRequest({ res, message: "Invalid old password" });
  }
  const hashedPassword = await generateHash({
    plainText: newPassword,
    algo: securityEnum.ARGON2,
  });
  await dbService.updateOne({
    model: userModel,
    filter: { email: req.user.email },
    update: {
      password: hashedPassword,
    },
  });
  emailEmitter.emit("changePassword", {
    email: req.user.email,
    name: user.firstName,
  });
  return successResponse({
    res,
    statusCode: 200,
    message: "Password changed successfully",
  });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw badRequest({ res, message: "Email and password are required" });
  }
  const user = await dbService.findOne({
    model: userModel,
    filter: { email, isActive: true, confirmEmail: { $exists: true } },
  });
  if (!user?.isActive) {
    throw badRequest({ res, message: "Email not confirmed" });
  }
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
  const { jti, exp, sub } = req.decoded;
  if (exp * 1000 > Date.now() + 30000) {
    throw badRequest({ res, message: "Refresh token is not expired" });
  }
  await createRevokeToken(sub, jti, exp);
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

export const logoutUser = async (req, res) => {
  const { flag } = req.body;
  const user = req.user;
  const { jti, exp, sub } = req.decoded;
  let status = 200;
  switch (flag) {
    case authEnum.ALL:
      user.changeCredentialsAt = new Date();
      await user.save();
      await del(await keys(baseRevokeTokenKey(sub)));
      status = 200;
      break;
    default:
      if (!jti) {
        throw badRequest({
          res,
          message: "Invalid token: missing jti. Please login again.",
        });
      }

      await createRevokeToken(sub, jti, exp);
      status = 201;
      break;
  }

  return successResponse({
    res,
    statusCode: status,
    message: "User logged out successfully",
    data: {},
  });
};
