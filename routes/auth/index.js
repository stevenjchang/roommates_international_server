const express = require("express");
const middleware = require("../../middleware");
const router = express.Router();

router.route("/login").post(
  middleware.passport.authenticate("local-login", {
    successRedirect: "/account/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;

// router.route("/register").post(
//   middleware.passport.authenticate("local", {
//     successRedirect: "/profile",
//     failureRedirect: "/signup",
//     failureFlash: true,
//   })
// );
