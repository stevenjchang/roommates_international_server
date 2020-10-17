const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

const pgInstance = require("./pg.js");

const listingRouter = require("./routes/listings.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/", (req, res) => {
  res.send("im the home page!");
});

app.use("/listing", listingRouter);

app.use("/", router);

app.listen(PORT, () => {
  console.log("listening on PORT:", PORT);
});
