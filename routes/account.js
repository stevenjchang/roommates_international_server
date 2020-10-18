const express = require("express");
const router = express.Router();
const client = require("../pg.js");

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
  const { username, email, display_name } = req.body;
  const text =
    "INSERT INTO account (username, email, display_name) VALUES ($1, $2, $3) RETURNING *";
  const values = [username, email, display_name];
  try {
    const dbRes = await client.query(text, values);
    res.send({ result: dbRes.rows });
  } catch (err) {
    console.log("Error ==>", err);
  }
});

module.exports.accountRouter = router;
