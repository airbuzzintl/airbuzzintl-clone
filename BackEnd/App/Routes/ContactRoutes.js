const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const ContactController = require("../Controller/ContactController");

//Contact storage
let ContactStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/Docs/Contact/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      "contact" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let constactDocs = multer({
  storage: ContactStorage,
});

// Franchise
router.get("/Franchise", ContactController.getFranchiseSectionData);
router.post("/Franchise", ContactController.createFranchiseSectionData);
router.put("/Franchise", ContactController.updateFranchiseSectionData);

// career  page router
router.post(
  "/createCareer",
  constactDocs.single("file"),
  ContactController.createCarrerController
);
router.get("/getCareer", ContactController.getCareerData);

router.put(
  "/updateCareerData/:id",
  constactDocs.single("file"),
  ContactController.updateCareerData
);

module.exports = router;
