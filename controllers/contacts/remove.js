const { Contact } = require("../../models/contacts");
const createError = require("http-errors");

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId, req.body);

    if (!result) {
      throw createError(404, `Contact with contactId ${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;