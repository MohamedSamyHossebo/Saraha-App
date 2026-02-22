import crypto from 'crypto';
const IV_LENGTH = 16; // For AES, this is always 16 initialization vector length
const ENCRYPTION_SECRET_KEY = "123456789012345678901234567890123";
// Symmetric  encryption
export const encrypt = async (data) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_SECRET_KEY), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
export const decrypt = async (data) => {
    const [iv, encryptedData] = data.split(':');
    const binaryLike = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_SECRET_KEY), binaryLike);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;

}