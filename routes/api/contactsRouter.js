const express = require("express");

const {validation } = require("../../middlewares");
const { schemas } = require("../../models/contacts");
const {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact
} = require("../../controllers/contacts");

const validationMiddleware = validation(schemas.addSchema);
const validationMiddlewareFavorite = validation(schemas.updateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", getAll);

contactsRouter.get("/:contactId", getById);

contactsRouter.post("/", validationMiddleware,add);

contactsRouter.delete("/:contactId", remove);

contactsRouter.put("/:contactId", validationMiddleware, update);

contactsRouter.patch( "/:contactId/favorite", validationMiddlewareFavorite, updateStatusContact );

module.exports = contactsRouter;