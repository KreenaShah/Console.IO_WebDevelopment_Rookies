const mongoose = require("mongoose");
const Joi = require("joi");

const clientIssueSchema = new mongoose.Schema({
  clientEmail:{type:String},
  issue: { type: String, require: true },
  category: { type: String, require: true },
  negotiated: { type: Number, default: 0 },
});

const quotationSchema = new mongoose.Schema({
  issueId:{type:String},
  quotation:{type:Number},
  workerEmail:{type:String},
})

const ClientIssue = mongoose.model("clientIssue", clientIssueSchema);
const Quotation=mongoose.model("quotation",quotationSchema);

const validateClientIssue = (data) => {
  const schema = Joi.object({
    issue: Joi.string().required().label("Issue"),
    category: Joi.string().required().label("Category"),
    clientEmail: Joi.string().required().label("Email"),
    negotiated: Joi.string().label("Negotiated"),
  });
  return schema.validate(data);
};

module.exports = { ClientIssue, validateClientIssue,Quotation };
