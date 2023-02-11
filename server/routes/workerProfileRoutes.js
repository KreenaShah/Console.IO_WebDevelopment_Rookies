const {
  addWorkerProfile,
  getWorkerProfiles,
  getWorkerProfile,
  getUnverifiedWorkerProfiles,
  editWorkerProfile,
  deleteWorkerProfile,
  verifyWorkerProfile,
  rejectWorkerProfile,
} = require("../controller/workerProfileController");
const { upload } = require("../middlewares/multer");
const express = require('express')
const router = express.Router();

router.post("/addWorkerProfile", upload.single("file"), addWorkerProfile);
router.get("/allWorkerProfiles", getWorkerProfiles);
router.get("/unverifiedWorkerProfiles", getUnverifiedWorkerProfiles);
router.get("/:id", getWorkerProfile,);
router.put("/:id", editWorkerProfile);
router.delete("/:id", deleteWorkerProfile);
router.get("/verify/:id",verifyWorkerProfile);
router.get("/reject/:id",rejectWorkerProfile);


// router.get("/all", (req, res) => {
//   console.log("Hey!");
//   res.send("Hey , Kreena here!");
// });

router.get("/",(req, res) => {
  console.log("Welcome");
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
