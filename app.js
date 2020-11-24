const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config/")[env];
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const expressSession = require("express-session")({
  secret: config.session.sessionSecret,
  resave: false,
  saveUninitialized: false,
});
const client = require("./pg.js");
const router = express.Router();
const { accountRouter } = require("./routes/account/index.js");
const { listingRouter } = require("./routes/listing/index.js");
const { authRouter } = require("./routes");
// const cors = require('cors')
const setCorsHeaders = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

// Middlewear
app.use(cookieParser(config.session.sessionSecret));
app.use(expressSession);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(setCorsHeaders);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// require("./middleware/passport.js")(passport);

// Routes
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No user found");
//     req.logIn(user, (err) => {
//       if (err) throw err;
//       res.send("Successfully Authenticated");
//     });
//   })(req, res, next);
// });
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  const text = `
    INSERT INTO account (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [username, hashedPassword];
  client.query(text, values).then((result) => {
    const data = result.rows[0];
    res.send(data);
  });
});
router.get("/user", (req, res) => {
  res.send(req.user);
});

router.get("/", (req, res) => {
  res.send("im the home page!");
});

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/listing", listingRouter);

app.use("/", router);

app.listen(config.port, () => {
  console.log("listening on PORT:", config.port);
});
