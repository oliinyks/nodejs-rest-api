const Contact = require("../models/contact");

const getContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({}, "-createdAt, -updatedAt");

    res.json({
      status: "success",
      code: 200,
      message: "Contacts found",
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getContactId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    // Contact.findOne({_id: id}); - пошук по одному критерію

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      message: `Contact with id=${id} found`,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact whith id=${id} not found `,
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      message: `Contact whith id=${id} deleted `,
    });
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Add new contact",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      message: "Update contact",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const patchContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      message: "Update contact",
      data: {
        result,
      }, 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactId,
  deleteContact,
  postContact,
  putContact,
  patchContact,
};
