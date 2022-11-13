const express = require("express");

const { auth, upload } = require("../../middlewares");

const { getCurrent, updateAvatar } = require("../../controllers/users");

const router = express.Router();

router.get("/current", auth, getCurrent);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;