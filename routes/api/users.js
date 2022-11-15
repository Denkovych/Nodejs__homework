const express = require("express");

const { auth, upload } = require("../../middlewares");

const { getCurrent, updateAvatar, verifyEmail } = require("../../controllers/users");

const router = express.Router();

router.get("/current", auth, getCurrent);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyEmail);

module.exports = router;