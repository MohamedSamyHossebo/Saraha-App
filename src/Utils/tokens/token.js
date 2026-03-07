import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_USER_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_ADMIN_SECRET, JWT_REFRESH_ADMIN_SECRET, JWT_REFRESH_USER_SECRET, JWT_REFRESH_TOKEN_EXPIRES_IN } from "../../../config/config.service.js";
import { SIGNATURE_ENUM } from "../../Utils/enums/user.enum.js";
import { set, revokeTokenKey } from "../../services/index.js";

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
export const getNewLoginCredentials = async (user) => {
    const signature = await getSignature({ signatureLevel: user.role != SIGNATURE_ENUM.ADMIN ? SIGNATURE_ENUM.USER : SIGNATURE_ENUM.ADMIN })

    const jtiAccess = crypto.randomUUID();
    const jtiRefresh = crypto.randomUUID();

    const accessToken = await generateToken({
        payload: { sub: user._id, role: user.role, tokenType: 'access', jti: jtiAccess },
        secret: signature.accessSignature,
        options: { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN }
    })
    const refreshToken = await generateToken({
        payload: { sub: user._id, role: user.role, tokenType: 'refresh', jti: jtiRefresh },
        secret: signature.refreshSignature,
        options: { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN }
    })
    return { accessToken, refreshToken }
}
export const createRevokeToken = async (userId, jti, exp) => {
    await set({
        key: revokeTokenKey({ userId, jti }),
        value: jti,
        ttl: exp - Math.floor(Date.now() / 1000),
    })
}