import Joi from "joi";

export const signUpSchema = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(25).required(),
    lastName: Joi.string().alphanum().min(2).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    DOB: Joi.date().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.number().required(),
})