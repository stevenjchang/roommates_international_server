const { compare } = require("bcryptjs");
const express = require("express");
const middleware = require("../../middleware");
const router = express.Router();
const { logError } = require("../../utils/consoleLog");

router.route("/login").post((req, res, next) => {
  middleware.passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      logError(__filename, err);
      res.json(info);
    }
    res.json(user);
  })(req, res, next);
});

router.get((req, res) => {
  req.logout();
  res.redirect("/abc");
});

module.exports = router;
