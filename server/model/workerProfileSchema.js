const mongoose = require("mongoose");
const Joi = require("joi");

const workerProfileSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  city: { type: String, require: true },
  contact: { type: Number, require: true },
  expertise: { type: String, require: true },
  experience: { type: String, require: true },
  age: { type: Number, require: true },
  gender: { type: String, require: true },
  image: { type: String, require: true }
});

const WorkerProfile = mongoose.model("workerProfile", workerProfileSchema);

const validateWorkerProfile = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().required().label("Name"),
    description: Joi.string().required().label("Description"),
    city: Joi.string().required().label("City"),
    contact: Joi.number().required().label("Contact"),
    expertise: Joi.string().required().label("Expertise"),
    experience: Joi.string().required().label("Experience"),
    age: Joi.number().required().label("Age"),
    gender: Joi.string().required().label("Gender"),
    image: Joi.string().required().label("DocUpload"),
  });
  return schema.validate(data);
};

module.exports = { WorkerProfile, validateWorkerProfile };
