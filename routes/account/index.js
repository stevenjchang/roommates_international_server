const express = require("express");
const middleware = require("../../middleware");
const router = express.Router();
const { logError } = require("../../utils/consoleLog");
const { Account } = require("../../models");

router.get("/allusers", async (req, res) => {
  try {
    const allUsers = await Account.getAllUsers();
    res.json(allUsers);
  } catch (err) {
    logError(__filename, err);
  }
});

router.get("/profile", middleware.auth.verify, (req, res) => {
  res.send("welcome to the profile page");
});

router.post("/createuser", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await Account.findUserByEmail(email);
    if (existingUser.length === 0) {
      const newUserInfo = await Account.createUser(req.body);
      if (newUserInfo.name === "error") {
        res.send(newUserInfo.message);
      } else {
        res.json(newUserInfo);
      }
    } else {
      res.send(
        `a user with this email already exists: ${existingUser[0].email}`
      );
    }
  } catch (err) {
    logError(__filename, err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Account.findUserById(id);
  if (user.length === 1) {
    res.json(user);
  } else if (user.length > 1) {
    logError(__filename, "duplicate user exists");
  } else {
    res.send("account does not exists");
  }
});

module.exports.accountRouter = router;
