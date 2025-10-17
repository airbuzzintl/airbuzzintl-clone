const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const services = require("../Controller/ServicesController");

// Service Stroage
let serviceStroage = multer.diskStorage({
  destination: (res, file, callBack) => {
    callBack(null, "./public/Docs/Services");
  },
  filename: (res, file, callBack) => {
    callBack(
      null,
      "/Services" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let servicesDocs = multer({
  storage: serviceStroage,
});

// routes
// const uploadFiles = servicesDocs.fields([
//   { name: "image_1", maxCount: 1 },
//   { name: "image_2", maxCount: 1 },
//   { name: "image_3", maxCount: 1 },
//   { name: "image_4", maxCount: 1 },
// ]);
router.post(
  "/createProvideServices",
  servicesDocs.single("file"),
  services.createProvideSevices
);
router.get("/getProvideServices/:type", services.getProvideServices);
router.put(
  "/updateProvideService/:id",
  servicesDocs.single("file"),
  services.updateProvideServiceControler
);
router.delete(
  "/deleteProvideService/:id",
  services.deleteProvideServiceControler
);
router.put("/updateInternationalTitle", services.updateInternationalTitle);
router.put("/updateDomesticTitle", services.updateDomesticTitle);
router.get("/getmetaTitle", services.getmetaTitle);
router.post("/postmetaTitle", services.postmetataitle);
module.exports = router;
