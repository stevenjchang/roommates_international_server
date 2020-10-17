const express = require("express");
const { connect } = require("../pg.js");
const listingRouter = express.Router();
const client = require("../pg.js");

listingRouter.get("/", async (req, res) => {
  const text = "SELECT * FROM listing;";
  try {
    await client.connect();
    const dbRes = await client.query(text);
    const result = dbRes.rows;
    console.log("result ==>", result);
    res.send(JSON.stringify(result));
    client.end();
  } catch (err) {
    console.log("err ==>", err);
  }
});

listingRouter.post("/", async (req, res) => {
  const { title, summary } = req.body;
  const text =
    "INSERT INTO listing (title, summary) VALUES ($1, $2) RETURNING *";
  const values = [title, summary];
  try {
    await client.connect();
    const dbRes = await client.query(text, values);
    const result = dbRes.rows;
    console.log("result ==>", result);
    res.send(JSON.stringify(result));
    client.end();
  } catch (err) {
    console.log("err ==>", err);
  }
});

module.exports = listingRouter;
