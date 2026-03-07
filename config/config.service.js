import { resolve } from "path";
import dotenv from "dotenv";
const envPath = {
    dev: "/config/.env.dev",
    prod: "/config/.env.prod"
}
dotenv.config({ path: resolve(`.${envPath.dev}`) });


export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.DB_URI;
export const DB_NAME = process.env.DB_NAME;
export const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
export const JWT_REFRESH_USER_SECRET = process.env.JWT_REFRESH_USER_SECRET;
export const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
export const JWT_REFRESH_ADMIN_SECRET = process.env.JWT_REFRESH_ADMIN_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
export const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
export const SALT = process.env.SALT;
// Social Login
export const CLIENT_ID = process.env.CLIENT_ID;
// Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;