const express = require("express");
const router = express.Router();
const client = require("../../pg.js");

router.get("/all", async (req, res) => {
  const text = "SELECT * FROM account;";
  try {
    const dbRes = await client.query(text);
    res.send({ result: dbRes.rows });
  } catch (err) {
    console.log("Error ==>", err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const text = "SELECT * FROM account WHERE id = $1";
  const values = [id];
  try {
    const dbRes = await client.query(text, values);
    res.send({ result: dbRes.rows });
  } catch (err) {
    console.log("Error ==>", err);
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
