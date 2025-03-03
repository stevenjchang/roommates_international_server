const { Pool } = require("pg");

const environment = process.env.NODE_ENV || "development";
const config = require(`./config/${environment}`).database;
const client = new Pool(config);

module.exports = client;
