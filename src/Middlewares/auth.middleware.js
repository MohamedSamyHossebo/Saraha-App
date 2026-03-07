
import { TOKEN_TYPE_ENUM, SIGNATURE_ENUM } from "../Utils/enums/user.enum.js";
import { badRequest, notFound, unauthorized } from "../Utils/response/error.response.js";
import { getSignature, verifyToken } from "../Utils/tokens/token.js";
import * as dbService from "../DB/database.repository.js";
import userModel from "../DB/Models/User/user.model.js";
import tokenModel from "../DB/Models/Token/token.model.js";

export const decodedToken = async ({ authorization, tokenType = TOKEN_TYPE_ENUM.ACCESS }) => {
    if (!authorization) { throw badRequest({ message: "Authorization header is required" }); }

    const [prefix, token] = authorization.split(" ");
    if (!prefix || !token) { throw badRequest({ message: "Invalid Authorization header" }); }
    console.log(prefix, token);
    const signatureLevel = prefix === "Admin" ? SIGNATURE_ENUM.ADMIN : SIGNATURE_ENUM.USER;
    const signature = getSignature({ signatureLevel })
    console.log(signature);
    const decoded = verifyToken({
        token,
        secret: tokenType === TOKEN_TYPE_ENUM.ACCESS ? signature.accessSignature : signature.refreshSignature
    })
    console.log(decoded);
    const blacklistedToken = await dbService.findOne({ model: tokenModel, filter: { jti: decoded.jti } })
    if (blacklistedToken) { throw unauthorized({ message: "Token is blacklisted" }); }

    const user = await dbService.findById({ model: userModel, id: decoded.id })
    if (!user) { throw notFound({ message: "User not found" }); }

    if (user.changeCredentialsAt && parseInt(user.changeCredentialsAt.getTime() / 1000) > decoded.iat) {
        throw unauthorized({ message: "Token expired. Please login again." });
    }

    return { user, decoded }
}

export const authentication = ({ tokenType = TOKEN_TYPE_ENUM.ACCESS }) => {
    return async (req, res, next) => {
        try {
            const { user, decoded } = await decodedToken({ authorization: req.headers.authorization, tokenType })
            req.user = user
            req.decoded = decoded
            return next()
        } catch (error) {
            return next(error)
        }
    }
}
export const authorization = ({ accessRoles = [] }) => {
    return async (req, res, next) => {
        try {
            if (!accessRoles.includes(req.user.role)) {
                throw unauthorized({ message: "You do not have permission to access this resource" });
            }
            return next()
        } catch (error) {
            return next(error)
        }
    }
}