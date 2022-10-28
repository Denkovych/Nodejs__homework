const express = require("express");

const { auth, validation } = require("../../middlewares");
const { register, login, logout } = require("../../controllers/auth");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/users");

const validationMiddleware = validation(joiRegisterSchema);
const validationLoginMiddleware = validation(joiLoginSchema);

const authRouter = express.Router();

authRouter.post("/register", validationMiddleware, register);
authRouter.post("/login", validationLoginMiddleware, login);
authRouter.get("/logout", auth, logout);

module.exports = authRouter;