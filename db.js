const pg = require("pg");
const { Pool } = pg;

// eslint-disable-next-line no-undef
const connectionString = process.env.DB_CONNECTION;

const pool = new Pool({
    connectionString,
});

module.exports = pool;