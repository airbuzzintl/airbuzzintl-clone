const express = require("express");
const Landing = require("./LandingRoutes");
const About = require("./AboutRoutes");
const Contact = require("./ContactRoutes");
const Support = require("./SupportRouter");
const Service = require("./ServicesRoutes");
const Ferro = require("./FerroRoutes");
const db = require("../Configuration/Config");
const fs = require("fs");
const path = require("path");

const router = express.Router();
router.use("/landing", Landing);
router.use("/About", About);
router.use("/Contact", Contact);
router.use("/Support", Support);
router.use("/Service", Service);
router.use(
  "/Ferro",
  (req, res, next) => {
    console.log("Middleware in Ferro route");
    console.log("Request body:", req.body);
    next();
  },
  Ferro
);


router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const query = `SELECT * FROM admin_users WHERE email = '${email}' AND password = '${password}'`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const user = results[0];
      const message = "success";
      const user_details = {
        name: user.name,
        email: user.email,
        userId: user.id,
      };
      res.send({ message, ...user_details });
    }
  });
});
router.get("/download/*", (req, res) => {
  console.log(req.params);
  const filePath = path.join("./public", req.params[0]);
  const fileLocation = path.join(filePath);
  fs.access(fileLocation, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("File not found");
    } else {
      const fileStream = fs.createReadStream(fileLocation);
      const fileName = req.header("X-File-Name") || path.basename(filePath);
      const fileExtension = path.extname(fileName).toLowerCase();
      res.setHeader("Content-disposition", "attachment; filename=" + fileName);
      res.setHeader(
        "Content-type",
        `application/octet-stream/${fileExtension}`
      );
      fileStream.pipe(res);
    }
  });
});

module.exports = router;
