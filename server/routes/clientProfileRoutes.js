const {
  addClientProfile,
  getClientProfiles,
  getClientProfile,
  editClientProfile,
  deleteClientProfile,
} = require("../controller/clientProfileController");

const { upload } = require("../middlewares/clientImageMulter");
const express = require("express");
const router = express.Router();

router.post("/addClientProfile", upload.single("file"), addClientProfile);
router.get("/allClientProfiles", getClientProfiles);
router.get("/:email", getClientProfile);
router.put("/:id", editClientProfile);
router.delete("/:id", deleteClientProfile);

// router.get("/all", (req, res) => {
//   console.log("Hey!");
//   res.send("Hey , Kreena here!");
// });

router.get("/", (req, res) => {
  console.log("Welcome");
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
