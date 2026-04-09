import Joi from "joi";
import { generalFields } from "../../Middlewares/validation.middleware.js";
export const signUpSchema = {
    body: Joi.object({
        firstName: generalFields.firstName.required(),
        lastName: generalFields.lastName.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        DOB: generalFields.DOB.required(),
        phoneNumber: generalFields.phoneNumber.required(),
        gender: generalFields.gender,
        profileImage: generalFields.profileImage,
    }),
    params: Joi.object({}),
    query: Joi.object({}),
}

export const loginSchema = {
    body: Joi.object({
        email: generalFields.email.required(),
        password: generalFields.password.required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
}
export const confirmEmailSchema = {
    body: Joi.object({
        email: generalFields.email.required(),
        otp: Joi.string().length(6).required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
}
export const resendOtpSchema = {
    body: Joi.object({
        email: generalFields.email.required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
}
export const resetPasswordSchema = {
    body: Joi.object({
        email: generalFields.email.required(),
        otp: Joi.string().length(6).required(),
        newPassword: generalFields.password.required(),
        confirmPassword: generalFields.password.required(),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
}