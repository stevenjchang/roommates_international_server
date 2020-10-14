const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

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

app.use("/", router);

app.listen(PORT, () => {
  console.log("listening on PORT:", PORT);
});
