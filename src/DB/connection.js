import mongoose from "mongoose";
import { MONGODB_URI, DB_NAME } from "../../config/config.service.js";
import dns from "node:dns";

const connectDB = async () => {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,

        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
export default connectDB;