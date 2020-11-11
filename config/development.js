require("dotenv").config();

module.exports = {
  database: {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  },
  session: {
    sessionSecret: process.env.SESSION_SECRET_DEV,
  },
  port: process.env.PORT || 8080,
};
