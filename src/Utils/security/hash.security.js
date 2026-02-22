import { hash, compare } from "bcrypt";
import * as argon2 from "argon2";
import { SALT } from "../../../config/config.service.js";
import { securityEnum } from "../enums/security.enum.js";

export const generateHash = async ({ plainText, salt = SALT, algo = securityEnum.BCRYPT } = {}) => {
    let hashResult = ''
    switch (algo) {
        case securityEnum.BCRYPT:
            hashResult = await hash(plainText, parseInt(salt) || salt);
            break;
        case securityEnum.ARGON2:
            hashResult = await argon2.hash(plainText);
            break;
        default:
            hashResult = await hash(plainText, parseInt(salt) || salt);
            break;
    }
    return hashResult;
}

export const verifyHash = async ({ plainText, cipherText, algo = securityEnum.BCRYPT } = {}) => {
    let verifyResult = false;
    switch (algo) {
        case securityEnum.BCRYPT:
            verifyResult = await compare(plainText, cipherText);
            break;
        case securityEnum.ARGON2:
            verifyResult = await argon2.verify(cipherText, plainText);
            break;
        default:
            verifyResult = await compare(plainText, cipherText);
            break;
    }
    return verifyResult;
}