// db.js
// Manage connection with the database

const fs = require('fs');
const path = require('path');

const { Pool } = require('pg');

const certPath = path.resolve(__dirname, '../../../../src/lib/ssl/certificate.crt');


const pool = new Pool({
  user: 'doadmin',
  host: 'db-postgresql-nyc1-14321-do-user-1190747-0.b.db.ondigitalocean.com',
  database: 'resourcescannerdb',
  password: 'AVNS_ddLSGYw7ciIsyyP-Q5D',
  sslmode: 'require',
  port: 25060,
	  ssl: {
    rejectUnauthorized: false, // You may want to change this
		  ca: fs.readFileSync(certPath).toString(),
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

