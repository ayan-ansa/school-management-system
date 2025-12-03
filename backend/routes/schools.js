import fs from "fs";
import express from "express";
import multer from "multer";
import path from "path";
import { addSchools, getSchools } from "../controllers/schoolController.js";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "schoolImages");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getSchools);

router.post("/add", upload.single("image"), addSchools);

export default router;
