import db from "../config/db.js";
import path from "path";
import { uploadDir } from "../routes/schools.js";
import { uploadImage } from "../utils/service.js";

export const getSchools = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,name,address,city,image FROM schools"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSchool = async (req, res) => {
  const { filename } = req.file;
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    
    const { secure_url } = await uploadImage(path.join(uploadDir, filename));
    
    const [result] = await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, secure_url, email_id]
    );

    res.status(201).json({
      message: "School added successfully",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
