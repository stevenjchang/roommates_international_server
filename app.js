const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

const pgInstance = require("./pg.js");

const listingRouter = require("./routes/listings.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

var router = express.Router();

router.get("/", function (req, res) {
  res.send("im the home page!");
});

router.get("/about", function (req, res) {
  res.send("im the about page!");
});

app.use("/listing", listingRouter);

app.use("/", router);

app.listen(PORT, () => {
  console.log("listening on PORT:", PORT);
});
