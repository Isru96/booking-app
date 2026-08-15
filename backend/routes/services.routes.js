const express = require("express");
const router = express.Router();

const { getservices } = require("../controllers/services.controller");

router.get("/services", getservices);

module.exports = router;
