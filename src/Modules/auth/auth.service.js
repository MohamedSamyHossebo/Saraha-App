import { encrypt, decrypt } from "../../Utils/security/encryption.security.js";
import jwt from "jsonwebtoken";
import * as dbService from "../../DB/database.repository.js";
import { badRequest } from "../../Utils/response/error.response.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, age, phone } = req.body;
        if (!name || !email || !password || !age || !phone) {
            return res.status(400).json({ message: "All fields are required", status: "error" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const encryptedPhone = encrypt(phone);
        const userEmail = await dbService.findOne({ email });
        if (userEmail) {
            throw badRequest("Email already exists", 409);
        }
        const user = await dbService.create({ name, email, password: hashedPassword, age, phone: encryptedPhone });
        const token = jwt.sign(jwtUserObject(user), jwtSecret, { expiresIn: "1d" });
        user.token = token;
        await user.save();
        return res.status(201).json({ message: "User created successfully", status: "success", token });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", status: "error" });
        }
        const user = await dbService.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password", status: "error" });
        }
        const token = jwt.sign(jwtUserObject(user), jwtSecret, { expiresIn: "1d" });
        await dbService.findByIdAndUpdate(user._id, { token });
        return res.status(200).json({ message: "User logged in successfully", status: "success", token });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}