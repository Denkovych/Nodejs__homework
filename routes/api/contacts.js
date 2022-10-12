const express = require('express')
const createError = require("http-errors")
const Joi = require("joi");


const router = express.Router()

const contactSchema = Joi.object({
  name: Joi.string().min(1).alphanum().required(),
  email: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      }
    })
  }catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createError(404, `Contact with contactId ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
   try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
    const { contactId } = req.params;
    const result = await removeContact(contactId, req.body);

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
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params
    const result = await updateContact(contactId, req.body)
  if (!result) {
      throw createError(404, `Contact with contactId ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router
