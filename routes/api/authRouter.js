const express = require("express");

const { auth, validation } = require("../../middlewares");
const { auth } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const validationMiddleware = validation(joiRegisterSchema);
const validationLoginMiddleware = validation(joiLoginSchema);

const router = express.Router();

router.post("/register", validationMiddleware, register);
router.post("/login", validationLoginMiddleware, login);
router.get("/logout", auth, logout);

module.exports = router;