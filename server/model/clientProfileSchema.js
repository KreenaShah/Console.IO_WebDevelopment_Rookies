const mongoose = require("mongoose");
const Joi = require("joi");

const clientProfileSchema = new mongoose.Schema({
  name: { type: String, require: true },
  address: { type: String, require: true },
  contact: { type: Number, require: true },
  email: { type: String, require: true },
  image: { type: String, require: true },
});

const ClientProfile = mongoose.model("clientProfile", clientProfileSchema);

const validateClientProfile = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().required().label("Name"),
    address: Joi.string().required().label("Address"),
    contact: Joi.number().required().label("Contact"),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    image: Joi.string().required().label("ImageUpload"),
  });
  return schema.validate(data);
};

module.exports = { ClientProfile, validateClientProfile };
