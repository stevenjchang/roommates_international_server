import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const config: any = {
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
  // port: process.env.PORT || 8080,
  port: 4000,
};

const client = new Pool(config.database);

export default client;
