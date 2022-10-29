const express = require("express");

const { auth } = require("../../middlewares");

const { getCurrent } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, getCurrent);

module.exports = router;