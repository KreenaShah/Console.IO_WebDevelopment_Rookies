const {
  WorkerProfile,
  validateWorkerProfile,
} = require("../model/workerProfileSchema");
const { UserModel } = require('../model/model');

const addWorkerProfile = async (request, response) => {
  console.log("workerProfilecontroller => addWorkerProfile");
  console.log(request.body);
  console.log(request.file);
  const image = request.file ? request.file.filename : null;
  console.log("Image declare krne ke baad", image);

  const {
    name,
    description,
    city,
    contact,
    expertise,
    experience,
    age,
    gender,
    email,
  } = request.body;

  const workerProfile = {
    name,
    description,
    city,
    contact,
    expertise,
    experience,
    age,
    gender,
    image,
    email,
  };
  const { error } = validateWorkerProfile(workerProfile);
  if (error) {
    console.log(error.details[0].message);
    return response.status(400).send({ message: error.details[0].message });
  }

  const newWorkerProfile = new WorkerProfile({
    name,
    description,
    city,
    contact,
    expertise,
    experience,
    age,
    gender,
    image,
    email,
  });
  try {
    console.log("try");
    await newWorkerProfile.save();
    response.status(201).json(newWorkerProfile);
    console.log("Worker Profile created successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const getWorkerProfiles = async (request, response) => {
  try {
    const workerProfiles = await WorkerProfile.find({});
    response.status(200).json(workerProfiles);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
const getUnverifiedWorkerProfiles = async (request, response) => {
  // const workerProfs = [];
  try {
    const users = await UserModel.find({ isVerified: "false", access_lvl: "worker" });
    // users.forEach(async (u) => {
    //   var email = u.email;
    //   const workerProfile = await WorkerProfile.findOne({ email });
    //   workerProfs.push(workerProfile);
    // })
    lookForUsers(users).then(workerProfile=>{
      response.status(200).json(workerProfile);
    }).catch(err=>{
      console.log(err);
    })
    
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

async function lookForUsers(users) {
  let workerProfs = [];
  for (let u of users) {
    try {
      let found = await WorkerProfile.findOne({ email: u.email }).exec();
      workerProfs.push(found);
    } catch (e) {
      console.log(`did not find rider ${rider} in database`);
    }
  }
  console.log(workerProfs);
  return workerProfs;
}

const getWorkerProfile = async (request, response) => {
  try {
    // console.log(request.params.id);
    const workerProfile = await WorkerProfile.findOne({
      email: request.params.email,
    });
    // const user = await User.findById(request.params.id);
    response.status(200).json(workerProfile);
    // console.log(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const editWorkerProfile = async (request, response) => {
  const workerProfile = request.body;
  console.log(workerProfile);
  const editWorkerProfile = new WorkerProfile(workerProfile);
  try {
    await User.updateOne({ email: workerProfile.email }, editWorkerProfile);
    response.status(201).json(editWorkerProfile);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const deleteWorkerProfile = async (request, response) => {
  try {
    await rejectWorkerProfile(request,response);
    await WorkerProfile.deleteOne({ _id: request.params.id });
    response.status(201).json(editWorkerProfile);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const verifyWorkerProfile = async (request, response) => {
  try {
    const workerProfile = await WorkerProfile.findOne({
      _id: request.params.id,
    });

    const email = workerProfile.email;
    const user = await UserModel.findOne({ email });
    user.isVerified = "true";
    user.save();

    //EMAIL BHEJNA HAI

    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
}
const rejectWorkerProfile = async (request, response) => {
  try {
    const workerProfile = await WorkerProfile.findOne({
      _id: request.params.id,
    });

    const email = workerProfile.email;
    const user = await UserModel.findOne({ email });
    user.isVerified = "false";
    user.save();

    //EMIAL BHEJNA HAI

    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
}

module.exports = {
  addWorkerProfile,
  getWorkerProfiles,
  getUnverifiedWorkerProfiles,
  getWorkerProfile,
  editWorkerProfile,
  deleteWorkerProfile,
  verifyWorkerProfile,
  rejectWorkerProfile,
};
