const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const SupportController = require("../Controller/SupportController");

//Support Document storage
let SupportStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/Docs/Support/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      "support" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let supportDocs = multer({
  storage: SupportStorage,
});

//Support Document storage
let FaqStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/Docs/Support/");
  },
  filename: (req, file, callBack) => {
    callBack(null, "faq" + "-" + Date.now() + path.extname(file.originalname));
  },
});
let supportFaq = multer({
  storage: FaqStorage,
});

// FAQ
router.get("/Faq", SupportController.getFaqSectionData);
router.get("/updateFaqTitle/:title", SupportController.updateFaqTitle);
router.post(
  "/Faq",
  supportFaq.single("file"),
  SupportController.createFaqSectionData
);
router.put(
  "/Faq",
  supportFaq.single("file"),
  SupportController.updateFaqSectionData
);
router.delete("/Faq", SupportController.deleteFaqSectionData);

// Document
router.get("/Document", SupportController.getDocumentSectionData);
router.post(
  "/Document",
  supportDocs.single("file"),
  SupportController.createDocumentSectionData
);
router.put(
  "/Document/:id",
  supportDocs.single("file"),
  SupportController.updateDocumentSectionData
);

// Document Files
router.get("/Document/Files", SupportController.getDocumentFileSectionData);
router.post(
  "/Document/Files",
  supportDocs.single("file"),
  SupportController.createDocumentFileSectionData
);
// router.put(
//   "/Document/:id",
//   supportDocs.single("file"),
//   SupportController.updateDocumentSectionData
// );

module.exports = router;
