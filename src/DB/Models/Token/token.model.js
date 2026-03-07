import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jti: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true,
    },
});
const tokenModel = mongoose.model("Token", tokenSchema);
export default tokenModel;
