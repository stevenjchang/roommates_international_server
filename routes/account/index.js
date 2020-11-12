const express = require("express");
const router = express.Router();
const client = require("../../pg.js");
const { Account } = require("../../models");

router.get("/allusers", async (req, res) => {
  try {
    const allUsers = await Account.getAllUsers();
    res.json(allUsers);
  } catch (err) {
    console.log("Error ==>", err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Account.findUser(id);
  if (user.length === 1) {
    res.json(user);
  } else if (user.length > 1) {
    throw new Error("duplicate user exists");
  } else {
    res.send("account does not exists");
  }
});

router.post("/add", async (req, res) => {
  const selectExistsQuery =
    "SELECT EXISTS (SELECT username FROM account WHERE username = $1)";
  const insertIntoQuery =
    "INSERT INTO account (username, email, display_name) VALUES ($1, $2, $3) RETURNING *";

  const { username, email, display_name } = req.body;

  try {
    const ifExistsResult = await client.query(selectExistsQuery, [username]);
    const alreadyExists = ifExistsResult.rowCount > 0;
    if (alreadyExists) {
      res.status(400).send(`sorry, the username "${username}" is already take`);
    } else {
      const dbRes = await client.query(insertIntoQuery, [
        username,
        email,
        display_name,
      ]);
      res.send({ result: dbRes.rows });
    }
  } catch (err) {
    console.log("Error ==>", err);
  }
});

module.exports.accountRouter = router;
