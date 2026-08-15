const express = require("express");
const cors = require("cors");
require("dotenv").config();

const servicesRoutes = require("./routes/services.routes");
const appointmentsRoutes = require("./routes/appointments.routes"); // 1. ይህ ተጨምሯል

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Booking app is alive!");
});

app.use(servicesRoutes);
app.use(appointmentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
