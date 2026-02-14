import mongoose from "mongoose";
import { GENDER, PROVIDER, ROLE } from "../../Utils/enums/user.enum.js";
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    DOB: Date,
    phoneNumber: String,
    gender: {
        type: String,
        enum: [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER],
        default: GENDER.MALE
    },
    role: {
        type: String,
        enum: [ROLE.USER, ROLE.ADMIN],
        default: ROLE.USER
    },
    provider: {
        type: String,
        enum: [PROVIDER.GOOGLE, PROVIDER.GITHUB, PROVIDER.FACEBOOK],
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
