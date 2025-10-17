const express = require("express");
const router = express.Router();
const LandingScreenController = require("../Controller/LandingController");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

//Landing storage
let landingStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const dir = "./public/Docs/Landing/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callBack(null, dir);
  },
  filename: (req, file, callBack) => {
    console.log("file", file);
    
    callBack(
      null,

      "landing" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let landingDocs = multer({
  storage: landingStorage,
});

// landing screen data

router.get(
  "/getHeader&EstimationData",
  LandingScreenController.getHeaderEstimationData
);
router.get(
  "/getOpenAccount&FaqData",
  LandingScreenController.getOpenAccountFaqData
);
router.get(
  "/getAirfreight&ArticlesData",
  LandingScreenController.getAirfreightArticlesData
);
router.get(
  "/getService&SocialFeedsData",
  LandingScreenController.getServiceSocialFeedsData
);
router.get("/getAllTitles", LandingScreenController.getAllTitles);

// Landing Header Content
router.get("/Header", LandingScreenController.getHeaderSectionData);
router.post(
  "/Header",
  landingDocs.single("file"),
  LandingScreenController.createHeaderSectionData
);
router.put(
  "/Header/:id",
  landingDocs.single("file"),
  LandingScreenController.updateHeadersection
);
// Landing screen Estimation

router.get("/Estimation", LandingScreenController.getEstimationSectionData);
router.post(
  "/Estimation",
  landingDocs.single("file"),
  LandingScreenController.createEstimationSectionData
);
router.put(
  "/Estimation/:id",
  landingDocs.single("file"),
  LandingScreenController.updateEstimationSection
);
// Landing screen Open Account

router.get("/OpenAccount", LandingScreenController.getOpenAccountSectionData);
router.post(
  "/OpenAccount",
  landingDocs.single("file"),
  LandingScreenController.createOpenAccountSectionData
);
router.put(
  "/OpenAccount/:id",
  landingDocs.single("file"),
  LandingScreenController.updateOpenAccountSection
);
// Landing screen faq

router.get("/Faq", LandingScreenController.getOpenFaqSectionData);
router.post(
  "/Faq",
  landingDocs.single("file"),
  LandingScreenController.createFaqSectionData
);
router.put(
  "/Faq/:id",
  landingDocs.single("file"),
  LandingScreenController.updateFaqSection
);

// Landing screen Airfreight
router.post(
  "/Airfreight",
  landingDocs.single("file"),
  LandingScreenController.createAirfreightSectionData
);
router.get("/Airfreight", LandingScreenController.getAirfreightSectionData);
router.put(
  "/Airfreight/:id",
  landingDocs.single("file"),
  LandingScreenController.updateAirfreightSection
);

// Landing screen Articles

const uploadsArticlesImage = landingDocs.fields([
  { name: "image_1", maxCount: 1 },
  { name: "image_2", maxCount: 1 },
]);
router.post(
  "/Articles",
  uploadsArticlesImage,
  LandingScreenController.createArticlesSectionData
);
router.get("/Articles", LandingScreenController.getArticlesSectionData);
const updateArticlesImage = landingDocs.fields([
  { name: "image_1", maxCount: 1 },
  { name: "image_2", maxCount: 1 },
]);
router.put(
  "/Articles/:id",
  updateArticlesImage,
  LandingScreenController.updateArticlesSection
);
router.delete("/deleteArticles/:id", LandingScreenController.deleteArticles);
router.put(
  "/UpdateArticleTitle/:articles_title/:articles_description",
  LandingScreenController.updateArticleTitle
);

//New Apis
router.get("/getArticleDetails", LandingScreenController.getArticleDetails);
router.get("/getArticleDetails/:slug", LandingScreenController.getArticleDetailsBySlug);
router.get("/getSlugs", LandingScreenController.getSlugs);

router.post(
  "/createArticleDetails",
  landingDocs.single("file"),
  LandingScreenController.createArticleDetails
);
router.put(
  "/updateArticleDetails/:id",
  landingDocs.single("file"),
  LandingScreenController.updateArticleDetails
);
router.delete("/deleteArticleDetails/:id", LandingScreenController.deleteArticleDetails);

// socialmedia
router.post(
  "/socialFeeds",
  landingDocs.single("file"),
  LandingScreenController.createFeedSocialMedia
);
router.get("/getSocialFeeds", LandingScreenController.getFeedSocialMedia);
router.put(
  "/UpdateSocialFeeds/:id",
  landingDocs.single("file"),
  LandingScreenController.updateSocialMediaFeeds
);
router.get(
  "/UpdateSocialFeeds/:title",
  LandingScreenController.updateSocialMediaFeedsTitle
);

// service
const uploadsFiles = landingDocs.fields([
  { name: "international_image", maxCount: 1 },
  { name: "domestic_image", maxCount: 1 },
]);
router.post(
  "/services",
  uploadsFiles,
  LandingScreenController.CreateServicesLogistics
);
router.get("/getServices", LandingScreenController.getServicesLogistics);
const updateImages = landingDocs.fields([
  { name: "international_image", maxCount: 1 },
  { name: "domestic_image", maxCount: 1 },
]);
router.put(
  "/service/:id",
  updateImages,
  LandingScreenController.UpdateServicesData
);

// Landing Service feeds
router.get("/serviceFeeds", LandingScreenController.getServiceFeeds);

router.put(
  "/serviceFeeds/:id",
  landingDocs.single("file"),
  LandingScreenController.updateServiceFeeds
);

module.exports = router;
