// app/lib/db.js
//Database connection
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'services_website',
  password: 'your_postgres_password',
  port: 5432,
});

module.exports = pool;
