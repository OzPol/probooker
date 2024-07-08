// utils/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
