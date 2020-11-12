const client = require("../pg.js");
const { cleanQueryData } = require("../utils/cleanData");

exports.findUser = async (id) => {
  const text = "SELECT * FROM account WHERE account_id = $1";
  const values = [id];
  try {
    const queryResult = await client.query(text, values);
    return cleanQueryData(queryResult);
  } catch (err) {
    console.log("err ==>", err);
    return err;
  }
};
