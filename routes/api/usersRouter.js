const express = require("express");

const { auth } = require("../../middlewares");

const { getCurrent } = require("../../controllers");

const usersRouter = express.Router();

usersRouter.get("/current", auth, getCurrent);

module.exports = usersRouter;