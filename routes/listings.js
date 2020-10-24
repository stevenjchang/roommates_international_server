const express = require("express");
const router = express.Router();
const client = require("../pg.js");

router.get("/all", async (req, res) => {
  const text = "SELECT * FROM listing;";
  try {
    const dbRes = await client.query(text);
    const result = dbRes.rows;
    res.send({ result });
  } catch (err) {
    console.log("err ==>", err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const text = "SELECT * FROM listing WHERE id = $1";
  const values = [id];
  try {
    const dbRes = await client.query(text, values);
    res.send({ result: dbRes.rows });
  } catch (err) {
    console.log("Error ==>", err);
  }
});

router.post("/", async (req, res) => {
  const { title, summary } = req.body;
  const text =
    "INSERT INTO listing (title, summary) VALUES ($1, $2) RETURNING *";
  const values = [title, summary];
  try {
    // await client.connect();
    const dbRes = await client.query(text, values);
    const result = dbRes.rows;
    res.send(JSON.stringify(result));
    // client.end();
  } catch (err) {
    console.log("err ==>", err);
  }
});

module.exports.listingRouter = router;
