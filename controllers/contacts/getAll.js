const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      { owner: _id },
      "name phone email favorite",
      { skip, limit: Number(limit) }
    ).populate("owner", "_id name email");
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;