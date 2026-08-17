const express = require("express");
const router = express.Router();

const {
  getappointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments.controller");

const { authenticate, authorize } = require("../middleware/auth.middleware");

// 1. ማንኛውም ሰው ቀጠሮ መያዝ ይችላል (Public)
router.post("/", createAppointment);

// 2. ቀጠሮዎችን ማየት የሚችሉት Owner እና Staff ብቻ ናቸው (Protected)
router.get("/", authenticate, authorize("owner", "staff"), getappointments);

// 3. ቀጠሮን ማስተካከል (Protected)
router.patch(
  "/:id",
  authenticate,
  authorize("owner", "staff"),
  updateAppointment,
);

// 4. ቀጠሮን መሰረዝ (Protected - Owner ብቻ)
router.delete("/:id", authenticate, authorize("owner"), deleteAppointment);

module.exports = router;
