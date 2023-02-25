const mongoose = require("mongoose");
const Joi = require("joi");

const workerProfileSchema = new mongoose.Schema({
  name: { type: String, require: true, default:'Worker' },
  description: { type: String, require: true,default:'Worker' },
  city: { type: String, require: true,default:'Worker'},
  contact: { type: Number, require: true,default:'Worker' },
  expertise: { type: String, require: true ,default:'Worker'},
  experience: { type: String, require: true,default:'Worker' },
  age: { type: Number, require: true,default:18 },
  gender: { type: String, require: true,default:'Worker' },
  image: { type: String, require: true,default:'Worker' },
  email:{type:String}
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
    email: Joi.string().required().label("Email"),
    image: Joi.string().required().label("DocUpload"),
  });
  return schema.validate(data);
};

module.exports = { WorkerProfile, validateWorkerProfile };
