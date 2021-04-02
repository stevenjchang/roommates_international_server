"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const config = {
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
const client = new pg_1.Pool(config.database);
exports.default = client;
//# sourceMappingURL=pg.js.map