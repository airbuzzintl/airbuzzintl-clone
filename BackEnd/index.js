const express = require("express");
const Environment = require("./App/Configuration/Environment");
const bodyParser = require("body-parser");
const Routes = require("./App/Routes/index");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.use(
  cors({
    origin: Environment.ALLOWEDORIGINS,
  })
);
const log = (req, res, next) => {
  const { originalUrl, method, query, body } = req;
  console.log(
    `Url: ${
      originalUrl.split("?")[0]
    } -> Method: ${method} -> Date: ${new Date()} -> Query: ${JSON.stringify(
      query
    )} || Body: ${JSON.stringify(body)} `
  );
  next();
};
app.use(bodyParser.json());

app.use("/airbuzz", log, Routes);

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(Environment.SERVERPORT, () => {
  console.log("Listening port", Environment.SERVERPORT);
});
