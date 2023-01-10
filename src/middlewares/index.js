const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const validateSchema = require("./validateSchemaRequest");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  ctrlWrapper,
  isValidId,
  validateSchema,
  auth,
  upload,
};
