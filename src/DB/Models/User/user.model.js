import mongoose from "mongoose";
import { GENDER, PROVIDER, ROLE } from "../../../Utils/enums/user.enum.js";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [2, "First name must be at least 2 characters"],
      maxLength: [25, "First name must be less than 25 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [2, "Last name must be at least 2 characters"],
      maxLength: [25, "Last name must be less than 25 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        return this.provider === PROVIDER.SYSTEM ? true : false;
      },
    },
    DOB: {
      type: Date,
      required: function () {
        return this.provider === PROVIDER.SYSTEM ? true : false;
      },
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.provider === PROVIDER.SYSTEM ? true : false;
      },
      // match: [/^\d{10}$/, "Please use a valid 10-digit phone number"]
    },
    gender: {
      type: Number,
      enum: Object.values(GENDER),
      default: GENDER.MALE,
    },
    profileImage: String,
    coverImage: [String],
    role: {
      type: Number,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    provider: {
      type: Number,
      enum: Object.values(PROVIDER),
      default: PROVIDER.SYSTEM,
    },
    confirmEmailOtp:String,
    forgetPasswordOtp:String,
    isActive:Boolean,
    confirmEmail: Date,
    changeCredentialsAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const getEnumKey = (obj, value) =>
          Object.keys(obj).find((key) => obj[key] === value);

        if (ret.gender !== undefined) ret.gender = getEnumKey(GENDER, ret.gender);
        if (ret.role !== undefined) ret.role = getEnumKey(ROLE, ret.role);
        if (ret.provider !== undefined)
          ret.provider = getEnumKey(PROVIDER, ret.provider);

        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);
userSchema.virtual("fullName").set(function (value) {
  this.firstName = value.split(" ")[0];
  this.lastName = value.split(" ")[1];
});

const User = mongoose.model("User", userSchema);
export default User;
