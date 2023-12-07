const fs = require('fs');
const path = require('path');

const SCHEMA_NAME = '2023_10_01';

const { Pool } = require('pg');
const certPath = '/var/www/html/resource-scanner/src/lib/ssl/certificate.crt';

const pool = new Pool({
  user: 'doadmin',
  host: 'db-postgresql-nyc1-14321-do-user-1190747-0.b.db.ondigitalocean.com',
  database: 'resourcescannerdb',
  password: 'AVNS_ddLSGYw7ciIsyyP-Q5D',
  sslmode: 'require',
  port: 25060,
  ssl: {
  rejectUnauthorized: false,
  ca: fs.readFileSync(certPath).toString(),
  }
});

function prepQuery(text) {
  return text.replace(/:SCHEMA\./g, `"${SCHEMA_NAME}".`);
}

module.exports = {
  query: (text, params) => pool.query(prepQuery(text), params),
  SCHEMA_NAME,  
};


