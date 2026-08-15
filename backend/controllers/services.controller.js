const pool = require("../config/db");

const getservices = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

module.exports = { getservices };
