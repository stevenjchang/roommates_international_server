const { Client } = require("pg");

const environment = process.env.NODE_ENV || "development";
const config = require(`./config/${environment}`);
const client = new Client(config);

module.exports = client;

// client
//   .connect()
//   .then(() => console.log("connected ==>"))
//   .then(() => client.query("SELECT * from post"))
//   .then((result) => console.log("result:", result.rows))
//   .catch((err) => console.log("err ==>", err))
//   .finally((fin) => {
//     console.log("fin ==>", fin);
//     client.end();
//   });
