// middleware/upload-middleware.mjs
import multer from "multer";
import path from "path";
import fs from "fs";

export const dynamicUpload = (fieldName, subDir = "general") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const targetDir = path.join("storage", subDir);
      fs.mkdirSync(targetDir, { recursive: true });
      cb(null, targetDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      cb(null, fileName);
    }
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Hanya file PNG/JPG/JPEG yang diperbolehkan"), false);
    }
    cb(null, true);
  };
  

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 2MB
    }
  }).single(fieldName);
};
