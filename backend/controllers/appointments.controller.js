const pool = require("../config/db");

// 1. GET ALL (with Service Details)
const getappointments = async (req, res) => {
  try {
    const query = `
      SELECT 
        appointments.id,
        appointments.customer_name,
        appointments.customer_email,
        appointments.appointment_time,
        appointments.status,
        appointments.created_at,
        services.name AS service_name,
        services.price AS service_price
      FROM appointments
      JOIN services ON appointments.service_id = services.id
      ORDER BY appointments.appointment_time DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch appointments", detail: err.message });
  }
};

// 2. CREATE
const createAppointment = async (req, res) => {
  const { customer_name, customer_email, service_id, appointment_time } =
    req.body;
  // 1. FIRST: check everything exists
  if (!customer_name || !customer_email || !service_id || !appointment_time) {
    return res.status(400).json({ error: "All fields are required" });
  } // 2. THEN: check the email format (safe now — we know it exists)
  if (!customer_email.includes("@")) {
    return res.status(400).json({ error: "Please provide a valid email" });
  } // 3. THEN: check the date
  if (new Date(appointment_time) < new Date()) {
    return res
      .status(400)
      .json({ error: "Appointment time can't be in the past" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO appointments (customer_name, customer_email, service_id, appointment_time)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [customer_name, customer_email, service_id, appointment_time],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create appointment", detail: err.message });
  }
};

// 3. UPDATE STATUS
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to update appointment", detail: err.message });
  }
};

// 4. DELETE
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM appointments WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({
      message: "Appointment deleted successfully",
      deleted: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to delete appointment", detail: err.message });
  }
};

module.exports = {
  getappointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
