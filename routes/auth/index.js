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
        console.log("err ==>", err);
        return;
      }
      res.send("you made it");
    });
    // res.cookie("cookie_thing", { test: "abc" }, { maxAge: 300000 });
    // res.json(user);
  })(req, res, next);
});

router.route("/verify").get(middleware.auth.verify, (req, res) => {
  console.log("*********************** ==>");
  res.send("success");
});

router.get((req, res) => {
  req.logout();
  res.redirect("/abc");
});

module.exports = router;
