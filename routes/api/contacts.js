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

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validationMiddleware,add);

router.delete("/:contactId", remove);

router.put("/:contactId", validationMiddleware, update);

router.patch(
  "/:contactId/favorite",
  validationMiddlewareFavorite,
  updateStatusContact
);

module.exports = router;