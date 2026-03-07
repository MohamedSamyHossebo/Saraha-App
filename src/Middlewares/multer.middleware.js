import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
const allowedPDFMimeTypes = ["application/pdf"];

export const localFileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(path.resolve("uploads")) || !fs.existsSync(path.resolve("uploads/images")) || !fs.existsSync(path.resolve("uploads/pdf"))) {
                fs.mkdirSync(path.resolve("uploads"), { recursive: true })
                fs.mkdirSync(path.resolve("uploads/images"), { recursive: true })
                fs.mkdirSync(path.resolve("uploads/pdf"), { recursive: true })
            }
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, path.resolve("uploads/images"))
            } else if (allowedPDFMimeTypes.includes(file.mimetype)) {
                cb(null, path.resolve("uploads/pdf"))
            } else {
                cb(null, false)
            }
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + path.extname(file.originalname))
        }
    })
    return multer({
        storage, fileFilter: (req, file, cb) => {
            if (allowedMimeTypes.includes(file.mimetype) || allowedPDFMimeTypes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(new Error("Invalid file type! Only images and PDFs are allowed."), false)
            }
        }
    })
}