const express = require("express");
const router = express.Router();
const client = require("../../pg.js");
const { commentRouter } = require("./comment/index.js");

router.use("/comment", commentRouter);

router.get("/all", async (req, res) => {
  const {
    price_min = 1,
    price_max = 9999999,
    shared_room = null,
    shared_house = null,
  } = req.query;
  const text = `SELECT * FROM listing 
    INNER JOIN listing_attribute as A 
    USING (listing_id) 
    WHERE (A.price > $1) 
    AND (A.price < $2) 
    AND (A.shared_room = $3 OR $3 IS NULL) 
    AND (A.shared_house = $4 OR $4 IS NULL)`;
  const values = [price_min, price_max, shared_room, shared_house];
  try {
    const dbRes = await client.query(text, values);
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
