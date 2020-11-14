const bcrypt = require("bcryptjs");
const client = require("../pg.js");
const { logError } = require("../utils/consoleLog");
const { cleanQueryData } = require("../utils/cleanData");

const findAllUsersQuery = `
SELECT account_id, username, email, first_name, last_name 
FROM account;
`;
const findUserByIdQuery = `
SELECT account_id, username, email, first_name, last_name 
FROM account 
WHERE account_id = $1;
`;
const findUserByUsernameQuery = `
SELECT account_id, username, email, first_name, last_name 
FROM account 
WHERE username = $1;
`;
const findUserByEmailQuery = `
SELECT account_id, username, email, first_name, last_name 
FROM account 
WHERE email = $1;
`;
const findIfUserExistsQuery = `
SELECT username, email 
FROM account
WHERE (username = $1 OR email = $2)
`;
const createUserQuery = `
INSERT INTO account (email, password, first_name, last_name, username) 
VALUES ($1, $2, $3, $4, $5) 
RETURNING email, first_name, last_name;
`;

exports.findIfUserExists = async (username, email) => {
  const values = [username, email];
  try {
    const queryResult = await client.query(findIfUserExistsQuery, values);
    return cleanQueryData(queryResult);
  } catch (err) {
    logError(__filename, err);
  }
};
exports.getAllUsers = async () => {
  try {
    const queryResult = await client.query(findAllUsersQuery);
    return cleanQueryData(queryResult);
  } catch (err) {
    logError(__filename, err);
    return err;
  }
};
exports.findUserById = async (id) => {
  try {
    const queryResult = await client.query(findUserByIdQuery, [id]);
    return cleanQueryData(queryResult);
  } catch (err) {
    logError(__filename, err);
    return err;
  }
};
exports.findUserByEmail = async (email) => {
  try {
    const queryResult = await client.query(findUserByEmailQuery, [email]);
    return cleanQueryData(queryResult);
  } catch (err) {
    logError(__filename, err);
    return err;
  }
};
exports.createUser = async (userData) => {
  const { email, password, first_name, last_name, username } = userData;
  const hashedPassword = await bcrypt.hash(password, 5);
  const values = [email, hashedPassword, first_name, last_name, username];
  try {
    const queryResult = await client.query(createUserQuery, values);
    return cleanQueryData(queryResult);
  } catch (err) {
    logError(__filename, err);
    return err;
  }
};
