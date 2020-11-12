const express = require("express");
const middleware = require("../middleware");
const router = express.Router();

router.route("/");

router.route("/login");

router.route("/register").post(
  middleware.passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);
