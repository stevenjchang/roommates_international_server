const expressSession = require("express-session");
const env = process.env.NODE_ENV || "development";
const config = require("./config/")[env];

module.exports.verify = (req, res, next) => {
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
