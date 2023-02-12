const sendemail = require("../middlewares/emailer");
const {
  ClientIssue,
  validateClientIssue,
  Quotation,
} = require("../model/clientIssueSchema");
const { ClientProfile } = require("../model/clientProfileSchema");
const { WorkerProfile } = require("../model/workerProfileSchema");

const addClientIssue = async (request, response) => {
  console.log("clientIssuecontroller => addClientIssue");
  console.log(request.body.negotiated);
  // console.log(request.file);
  // const image = request.file ? request.file.filename : null;
  // console.log("Image declare krne ke baad", image);

  const {
    clientEmail,
    issue,
    category,
  } = request.body;

  const clientIssue = {
    clientEmail,
    issue,
    category,
  };
  const { error } = validateClientIssue(clientIssue);
  if (error) {
    console.log(error.details[0].message);
    return response.status(400).send({ message: error.details[0].message });
  }

  const newClientIssue = new ClientIssue({
    clientEmail,
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
const getSpecificClientIssues = async (request, response) => {
  try {
    const clientIssues = await ClientIssue.find({ clientEmail: request.params.email });
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

const updateQuotation = async (request, response) => {
  // const clientIssue = request.body;
  // console.log(clientIssue);
  // const editClientIssue = new ClientIssue(clientIssue);
  try {
    console.log("UpdAING");
    // let quotation = await Quotation.findOne({
    //   issueId: request.body.id,
    // });
    console.log(request.body)
    // if (!quotation) {
    //   quotation = await Quotation.create({
    //     issueId: request.body.id,
    //     quotation: request.body.quotation,
    //     email: request.body.email
    //   })
    //   quotation.save();
    // }
    // else {
    //   quotation.quotation = new NumberInt(request.body.quotation);
    //   quotation.email = request.body.email;
    //   quotation.save();
    // }
    var email=request.body.email;
    var id=request.body.id;
    var quotation=request.body.quotation;
    let Issue=await ClientIssue.findOne({_id:id});
    var id2=Issue.clientEmail;
    console.log(email,id,id2);
    let worker=await WorkerProfile.findOne({email});
    let client=await ClientProfile.findOne({email:id2});
    console.log(worker,client);

    sendemail(email, { name:worker.name,iname:client.name,price:quotation }, '../middlewares/sendQuoteNotifs.handlebars');

    response.status(201).json({ message: "Quoted" });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
const getQuotation = async (req, res) => {
  try {
    let quotation = await Quotation.findOne({
      issueId: req.params.id,
    });
    res.json(quotation);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
}
module.exports = {
  addClientIssue,
  getClientIssues,
  getClientIssue,
  editClientIssue,
  deleteClientIssue,
  getSpecificClientIssues,
  updateQuotation,
  getQuotation
};
