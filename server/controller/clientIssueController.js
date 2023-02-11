const {
  ClientIssue,
  validateClientIssue,
} = require("../model/clientIssueSchema");

const addClientIssue = async (request, response) => {
  console.log("clientIssuecontroller => addClientIssue");
  console.log(request.body.negotiated);
  // console.log(request.file);
  // const image = request.file ? request.file.filename : null;
  // console.log("Image declare krne ke baad", image);

  const {
    client,
    issue,
    category,
  } = request.body;

  const clientIssue = {
    issue,
    category,
  };
  const { error } = validateClientIssue(clientIssue);
  if (error) {
    console.log(error.details[0].message);
    return response.status(400).send({ message: error.details[0].message });
  }

  const newClientIssue = new ClientIssue({
    client,
    issue,
    category,
  });
  try {
    console.log("try");
    await newClientIssue.save();
    response.status(201).json(newClientIssue);
    console.log("Client Issue created successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const getClientIssues = async (request, response) => {
  try {
    const clientIssues = await ClientIssue.find({ negotiated: 0 });
    response.status(200).json(clientIssues);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const getClientIssue = async (request, response) => {
  try {
    // console.log(request.params.id);
    const clientIssue = await ClientIssue.findOne({
      _id: request.params.id,
    });
    // const user = await User.findById(request.params.id);
    response.status(200).json(clientIssue);
    // console.log(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const editClientIssue = async (request, response) => {
  // const clientIssue = request.body;
  // console.log(clientIssue);
  // const editClientIssue = new ClientIssue(clientIssue);
  const clientIssue = await ClientIssue.findOne({
    _id: request.params.id,
  });
  try {
    clientIssue.negotiated
    response.status(201).json(editClientIssue);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const deleteClientIssue = async (request, response) => {
  try {
    await ClientIssue.deleteOne({ _id: request.params.id });
    response.status(201).json(editClientIssue);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

module.exports = {
  addClientIssue,
  getClientIssues,
  getClientIssue,
  editClientIssue,
  deleteClientIssue,
};
