const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config/")[env];
const expressSession = require("express-session")({
  secret: config.session.sessionSecret,
  resave: false,
  saveUninitialized: false,
});
const passport = require("passport");
const bodyParser = require("body-parser");
const pgInstance = require("./pg.js");
const { accountRouter } = require("./routes/account.js");
const { listingRouter } = require("./routes/listing/index.js");
// const { listingRouter } = require("listing/index.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
const router = express.Router();

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

app.use("/account", accountRouter);
app.use("/listing", listingRouter);

app.use("/", router);

app.listen(config.port, () => {
  console.log("listening on PORT:", config.port);
});
