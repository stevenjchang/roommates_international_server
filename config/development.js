require("dotenv").config();

module.exports = {
  database: {
    user: process.env.PGUSER_DEV,
    host: process.env.PGHOST_DEV,
    database: process.env.PGDATABASE_DEV,
    password: process.env.PGPASSWORD_DEV,
    port: process.env.PGPORT_DEV,
  },
  session: {
    sessionSecret: process.env.SESSION_SECRET_DEV,
  },
  port: process.env.PORT || 8080,
};
