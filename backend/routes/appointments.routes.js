const express = require("express");
const router = express.Router();

const {
  getappointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments.controller"); // ሁሉም እዚህ ገብተዋል

router.get("/appointments", getappointments);
router.post("/appointments", createAppointment);
router.patch("/appointments/:id", updateAppointment); // ወይም put
router.delete("/appointments/:id", deleteAppointment);

module.exports = router;
