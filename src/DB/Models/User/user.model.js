import mongoose from "mongoose";
import { GENDER, PROVIDER, ROLE } from "../../../Utils/enums/user.enum.js";
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    DOB: Date,
    phoneNumber: String,
    gender: {
        type: String,
        enum: Object.values(GENDER),
        default: GENDER.MALE
    },
    role: {
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.USER
    },
    provider: {
        type: String,
        enum: Object.values(PROVIDER),
        default: PROVIDER.GOOGLE
    },
    confirmEmail: Date,
    profilePic: String,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);
export default User;
