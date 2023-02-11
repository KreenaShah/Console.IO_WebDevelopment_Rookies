const {
    addWorkerProfile,
    getWorkerProfiles,
    getWorkerProfile,
    editWorkerProfile,
    deleteWorkerProfile,
  } = require("../controller/workerProfileController");
  const { upload } = require("../middlewares/multer");
  const express = require("express");
  const router = express.Router();
  
  router.post("/addClientIssue", upload.single("file"), addClientIssue);
  router.get("/allClientIssue", getWorkerProfiles);
  router.get("/:id", getWorkerProfile);
  router.put("/:id", editWorkerProfile);
  router.delete("/:id", deleteWorkerProfile);
  
  // router.get("/all", (req, res) => {
  //   console.log("Hey!");
  //   res.send("Hey , Kreena here!");
  // });
  
  router.get("/", (req, res) => {
    console.log("Welcome");
    res.status(200).send("Welcome 🙌 ");
  });
  
  module.exports = router;
  