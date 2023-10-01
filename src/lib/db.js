// lib/db.js
// Manage connection with the database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'doadmin',
  host: 'db-postgresql-nyc1-14321-do-user-1190747-0.b.db.ondigitalocean.com',
  database: 'resourcescannerdb',
  password: 'AVNS_ddLSGYw7ciIsyyP-Q5D',
  port: 25060,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

