import multer from "multer"

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        callback(null, `${uniqueSuffix}-${file.originalname.replace(/\s+/g, "_")}`)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.fieldname === "image" && !file.mimetype.startsWith("image/")) {
        return callback(new Error("Image file is invalid"));
    }
    if (file.fieldname === "audio" && !file.mimetype.startsWith("audio/")) {
        return callback(new Error("Audio file is invalid"));
    }
    callback(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 25 * 1024 * 1024 }
});

export default upload