import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN } from "../../../config/config.service.js";

export const generateToken = ({ payload, secret = JWT_SECRET, options = { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN } }) => {
    return jwt.sign(payload, secret, options);
}

export const verifyToken = ({ token, secret = JWT_SECRET }) => {
    return jwt.verify(token, secret);
}