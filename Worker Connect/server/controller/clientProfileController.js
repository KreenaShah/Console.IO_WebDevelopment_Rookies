const {
  ClientProfile,
  validateClientProfile,
} = require("../model/clientProfileSchema");

const addClientProfile = async (request, response) => {
  console.log("clientProfilecontroller => addClientProfile");
  console.log(request.body);
  console.log(request.file);
  const image = request.file ? request.file.filename : null;
  console.log("Image declare krne ke baad", image);

  const {
    name,
    address,
    contact,
    email
  } = request.body;

  const clientProfile = {
    name,
    address,
    contact,
    email,
    image,
  };
  const { error } = validateClientProfile(clientProfile);
  if (error) {
    console.log(error.details[0].message);
    return response.status(400).send({ message: error.details[0].message });
  }

  const newClientProfile = new ClientProfile({
    name,
    address,
    contact,
    email,
    image,
  });
  try {
    console.log("try");
    await newClientProfile.save();
    response.status(201).json(newClientProfile);
    console.log("Client Profile created successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const getClientProfiles = async (request, response) => {
  try {
    const clientProfiles = await ClientProfile.find({});
    response.status(200).json(clientProfiles);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const getClientProfile = async (request, response) => {
  try {
    // console.log(request.params.email);
    const clientProfile = await ClientProfile.findOne({
      email: request.params.email,
    });
    // const user = await User.findById(request.params.id);
    response.status(200).json(clientProfile);
    // console.log(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const editClientProfile = async (request, response) => {
  const clientProfile = request.body;
  console.log(clientProfile);
  const editClientProfile = new ClientProfile(clientProfile);
  try {
    await User.updateOne({ email: clientProfile.email }, editClientProfile);
    response.status(201).json(editClientProfile);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const deleteClientProfile = async (request, response) => {
  try {
    await ClientProfile.deleteOne({ _id: request.params.id });
    response.status(201).json(editClientProfile);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

module.exports = {
  addClientProfile,
  getClientProfiles,
  getClientProfile,
  editClientProfile,
  deleteClientProfile,
};
