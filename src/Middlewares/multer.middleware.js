import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

export const localFileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(path.resolve("uploads"))) {
                fs.mkdirSync(path.resolve("uploads"), { recursive: true })
            }
            cb(null, path.resolve("uploads"))
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + path.extname(file.originalname))
        }
    })
    return multer({
        storage, fileFilter: (req, file, cb) => {
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    })
}