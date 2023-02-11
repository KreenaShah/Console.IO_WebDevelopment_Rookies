const mongoose = require("mongoose");
const Joi = require("joi");

const clientIssueSchema = new mongoose.Schema({
  client:{type:String},
  issue: { type: String, require: true },
  category: { type: String, require: true },
  negotiated: { type: Number, default: 0 },
});

const quotationSchema = new mongoose.Schema({
  quotation:{type:Number},
  worker:{type:String},
  issue: [{ type: Schema.Types.ObjectId, ref: 'Issue' }]
})

const ClientIssue = mongoose.model("clientIssue", clientIssueSchema);
const Quotation=mongoose.model("quotation",quotationSchema);

const validateClientIssue = (data) => {
  const schema = Joi.object({
    issue: Joi.string().required().label("Issue"),
    category: Joi.string().required().label("Category"),
  });
  return schema.validate(data);
};

module.exports = { ClientIssue, validateClientIssue,Quotation };
