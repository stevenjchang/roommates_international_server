const client = require("../pg.js");
const { cleanQueryData } = require("../utils/cleanData");

exports.findUser = async (id) => {
  const text = `
    SELECT account_id, username, email, first_name, last_name 
    FROM account 
    WHERE account_id = $1;
  `;
  const values = [id];
  try {
    const queryResult = await client.query(text, values);
    return cleanQueryData(queryResult);
  } catch (err) {
    console.log("err ==>", err);
    return err;
  }
};

exports.getAllUsers = async () => {
  const text = `
    SELECT account_id, username, email, first_name, last_name FROM account;
  `;
  try {
    const queryResult = await client.query(text);
    return cleanQueryData(queryResult);
  } catch (err) {
    console.log("err ==>", err);
    return err;
  }
};
