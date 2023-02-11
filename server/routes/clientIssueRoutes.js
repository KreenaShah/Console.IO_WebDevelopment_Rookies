const {
    addClientIssue,
    getClientIssues,
    getClientIssue,
    editClientIssue,
    deleteClientIssue,
  } = require("../controller/clientIssueController");
//   const { upload } = require("../middlewares/multer");
  const express = require("express");
  const router = express.Router();
  
  router.post("/addClientIssue", addClientIssue); 
  router.get("/allClientIssues", getClientIssues);
  router.get("/:id", getClientIssue);
  router.put("/:id", editClientIssue);
  router.delete("/:id", deleteClientIssue);
  
  // router.get("/all", (req, res) => {
  //   console.log("Hey!");
  //   res.send("Hey , Kreena here!");
  // });
  
  router.get("/", (req, res) => {
    console.log("Welcome");
    res.status(200).send("Welcome 🙌 ");
  });
  
  module.exports = router;
  