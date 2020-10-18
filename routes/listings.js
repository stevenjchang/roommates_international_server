const express = require("express");
const listingRouter = express.Router();
const client = require("../pg.js");

listingRouter.get("/", async (req, res) => {
  const text = "SELECT * FROM listing;";
  try {
    const dbRes = await client.query(text);
    const result = dbRes.rows;
    res.send({ result });
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
    // await client.connect();
    const dbRes = await client.query(text, values);
    const result = dbRes.rows;
    res.send(JSON.stringify(result));
    // client.end();
  } catch (err) {
    console.log("err ==>", err);
  }
});

module.exports = listingRouter;
