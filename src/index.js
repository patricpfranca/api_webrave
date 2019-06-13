require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

require("./app/controllers/index")(app);

app.listen(3000);
