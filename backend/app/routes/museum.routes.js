const router = require("express").Router();
const museum = require("../controllers/museum.controller.js");

router.get("/", museum.getMuseums);
router.get("/:id", museum.getObject);

module.exports = router;
