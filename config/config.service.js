import { resolve } from "path";
import dotenv from "dotenv";
const envPath = {
    dev: "/config/.env.dev",
    prod: "/config/.env.prod"
}
dotenv.config({ path: resolve(`.${envPath.dev}`) });


export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;