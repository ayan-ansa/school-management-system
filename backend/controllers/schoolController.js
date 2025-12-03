import db from "../config/db.js";

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

export const addSchools = async (req, res) => {
  const { filename } = req.file;
  try {
    const { name, address, city, state, contact, email_id } = req.body;

    const [result] = await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, filename, email_id]
    );

    res.status(201).json({
      message: "School added successfully",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
