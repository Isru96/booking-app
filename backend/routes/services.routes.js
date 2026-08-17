const express = require("express");
const router = express.Router();

const { getservices } = require("../controllers/services.controller");

router.get("/", getservices);

module.exports = router;
