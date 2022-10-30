const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSchemaValidationErrors = require("../helpers/handleSchemaValidationErrors");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
     owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool,
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
module.exports = {
  Contact,
  schemas,
};
