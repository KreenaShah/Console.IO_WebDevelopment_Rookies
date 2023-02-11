const mongoose = require("mongoose");
const Joi = require("joi");

const clientIssueSchema = new mongoose.Schema({
  issue: { type: String, require: true },
  category: { type: String, require: true },
});

const ClientIssue = mongoose.model("clientIssue", clientIssueSchema);

const validateClientIssue = (data) => {
  const schema = Joi.object({
    issue: Joi.string().alphanum().required().label("Name"),
    category: Joi.string().required().label("Address"),
  });
  return schema.validate(data);
};

module.exports = { ClientIssue, validateClientIssue };
