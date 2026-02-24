import mongoose from "mongoose";
import { MONGODB_URI, DB_NAME } from "../../config/config.service.js";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,

        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
export default connectDB;