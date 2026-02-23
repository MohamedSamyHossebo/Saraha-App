import jwt from "jsonwebtoken";
import { JWT_USER_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN,JWT_ADMIN_SECRET,JWT_REFRESH_ADMIN_SECRET,JWT_REFRESH_USER_SECRET } from "../../../config/config.service.js";
import { SIGNATURE_ENUM } from "../../Utils/enums/user.enum.js";

export const generateToken = ({ payload, secret, options = { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN } }) => {
    return jwt.sign(payload, secret, options);
}

export const verifyToken = ({ token, secret }) => {
    return jwt.verify(token, secret);
}
export const getSignature = ({ signatureLevel = SIGNATURE_ENUM.USER }) => {
    let signature = { accessSignature: undefined, refreshSignature: undefined };
    switch (signatureLevel) {
        case SIGNATURE_ENUM.ADMIN:
            signature.accessSignature = JWT_ADMIN_SECRET;
            signature.refreshSignature = JWT_REFRESH_ADMIN_SECRET;
            break;
        case SIGNATURE_ENUM.USER:
            signature.accessSignature = JWT_USER_SECRET;
            signature.refreshSignature = JWT_REFRESH_USER_SECRET;
            break;
        default:
            signature.accessSignature = JWT_USER_SECRET;
            signature.refreshSignature = JWT_REFRESH_USER_SECRET;
            break;
    }
    return signature;
}