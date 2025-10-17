const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const AboutController = require("../Controller/AboutController");

//About storage
let aboutStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/Docs/About_us/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      "About_us" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let aboutDocs = multer({
  storage: aboutStorage,
});

// mission & vission
router.post(
  "/mission-vission",
  aboutDocs.single("file"),
  AboutController.postMissionAndVission
);
router.get("/mission-vission", AboutController.getMissionAndVission);
router.put(
  "/mission-vission/:id",
  aboutDocs.single("file"),
  AboutController.updateMissionAndVission
);

// our story
router.post(
  "/OurStory",
  aboutDocs.single("file"),
  AboutController.postOurStory
);
router.get("/OurStory", AboutController.getOurStory);
router.put(
  "/OurStory/:id",
  aboutDocs.single("file"),
  AboutController.updateOurStory
);

router.put("/Slide/:id", AboutController.updateSlide);

// Choose US
router.post(
  "/Chooseus",
  aboutDocs.single("file"),
  AboutController.postChooseus
);
router.get("/Chooseus", AboutController.getChooseus);
router.put(
  "/Chooseus/:id",
  aboutDocs.single("file"),
  AboutController.updateChooseus
);
router.delete("/Chooseus/:id", AboutController.deleteChooseUs);
router.put("/UpdatechooseUsTitle/:title", AboutController.UpdatechooseUsTitle);

// getAlldata
router.get("/allContents", AboutController.getAboutScreenData);

module.exports = router;
