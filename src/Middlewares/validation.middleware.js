import { badRequest } from "../Utils/response/error.response.js";
import Joi from "joi";
import { GENDER,ROLE,PROVIDER } from "../Utils/enums/user.enum.js";
import { Types } from "mongoose";
export const generalFields = {
    firstName: Joi.string().alphanum().min(2).max(25).message({
        "any.required": "First name is required",
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name must be at most 25 characters long",
        "string.alphanum": "First name must be alphanumeric",
    }),
    lastName: Joi.string().alphanum().min(2).max(25).message({
        "any.required": "Last name is required",
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name must be at most 25 characters long",
        "string.alphanum": "Last name must be alphanumeric",
    }),
    email: Joi.string().email().message({
        "any.required": "Email is required",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
    }),
    password: Joi.string(),
    DOB: Joi.date(),
    phoneNumber: Joi.string(),
    gender: Joi.string().valid(...Object.values(GENDER)),
    role: Joi.string().valid(...Object.values(ROLE)),
    provider:Joi.string().valid(...Object.values(PROVIDER)),
    profileImage: Joi.string(),
    id: Joi.string().custom((value, helper) => {
        return (
            Types.ObjectId.isValid(value) || helper.message("Invalid Object ID Format")
        )
    }),
}
export const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const validationErrors = []
        for (const key of Object.keys(schema)) {
            const validationResult = schema[key].validate(req[key], { abortEarly: false })
            if (validationResult.error) {
                validationErrors.push(...validationResult.error.details)
            }
        }
        if (validationErrors.length) {
            return next(badRequest({ res, message: validationErrors[0].message, extra: validationErrors }))
        }
        return next()
    }
}