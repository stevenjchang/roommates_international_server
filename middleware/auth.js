const expressSession = require("express-session");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];

module.exports.verify = (req, res, next) => {
  console.log("req.cookie ==>", req.cookie);
  console.log("whyyyyyyyyyyy ==>", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports.session = expressSession({
  secret: config.session.sessionSecret,
  resave: false,
  saveUninitialized: false,
});
