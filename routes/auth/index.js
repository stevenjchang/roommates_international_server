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
    //see NOTES.md - req.logIn is needed
    req.logIn(user, function (err2) {
      if (err2) {
        console.log("req.LogIn error ==>", err);
        return;
      }
      res.send(user);
    });
  })(req, res, next);
});

router.route("/verify").get((req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    console.log("Something went wrong in auth/verify ==>");
  }
});

router.get((req, res) => {
  req.logout();
  res.redirect("/abc");
});

module.exports = router;
