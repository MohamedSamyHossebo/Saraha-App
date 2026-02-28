import { badRequest } from "../Utils/response/error.response.js";

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