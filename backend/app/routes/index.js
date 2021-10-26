const express = require("express");
const router = express.Router();

const museum = require("./museum.routes");
router.use("/api/museum", museum);

module.exports = router;
