const mongoose = require("mongoose");
const Joi = require("joi");

const clientIssueSchema = new mongoose.Schema({
  issue: { type: String, require: true },
  category: { type: String, require: true },
  negotiated:{type:Number,default:0}
});

const ClientIssue = mongoose.model("clientIssue", clientIssueSchema);

const validateClientIssue = (data) => {
  const schema = Joi.object({
    issue: Joi.string().required().label("Issue"),
    category: Joi.string().required().label("Category"),
  });
  return schema.validate(data);
};

module.exports = { ClientIssue, validateClientIssue };
