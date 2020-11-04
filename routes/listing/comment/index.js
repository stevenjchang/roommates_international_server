const express = require("express");
const router = express.Router();
const client = require("../../../pg.js");

router.get("/:listing_id", async (req, res) => {
  const { listing_id } = req.params;
  const text = `
    SELECT comment_id, account_id, listing_id, content, username, first_name, last_name 
    FROM comment
    INNER JOIN account
    USING (account_id)
    WHERE listing_id = $1`;
  try {
    const dbRes = await client.query(text, [listing_id]);
    const result = dbRes.rows;
    res.send({ result });
  } catch (err) {
    console.log("err ==>", err);
  }
});

module.exports.commentRouter = router;
