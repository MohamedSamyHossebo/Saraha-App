
import { TOKEN_TYPE_ENUM } from "../Utils/enums/user.enum.js";
import { badRequest, notFound } from "../Utils/response/error.response.js";
import { getSignature, verifyToken } from "../Utils/tokens/token.js";
import * as dbService from "../DB/database.repository.js";
import userModel from "../DB/Models/User/user.model.js";

export const decodedToken = async ({ authorization, tokenType = TOKEN_TYPE_ENUM.ACCESS }) => {
    const { Bearer, token } = authorization.split(" ") || [];
    if (!Bearer || !token) { throw badRequest({ message: "Authorization header is required" }); }
    console.log(Bearer, token);
    let signature = await getSignature({ signatureLevel: Bearer })
    const decoded = await verifyToken({ token, secret: tokenType === TOKEN_TYPE_ENUM.ACCESS ? signature.accessSignature : signature.refreshSignature, tokenType })
    const user = await dbService.findById({ model: userModel, id: decoded.id })
    console.log(user);
    if (!user) { throw notFound({ message: "User not found" }); }
    return { user, decoded }

}

export const authentication = ({ tokenType = TOKEN_TYPE_ENUM.ACCESS }) => {
    return async (req, res, next) => {
        const { user, decoded } = (await decodedToken({ authorization: req.headers.authorization, tokenType })) || {}
        req.user = user
        req.decoded = decoded
        console.log(req.user);
        return next()
    }
}