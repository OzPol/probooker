const { Pool } = require('pg');

// Set up the connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pro_booker_test',
    password: 'password',
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};
