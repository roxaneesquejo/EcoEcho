const { Pool } = require('pg');

const pool = new Pool({
  user: 'eco_admin',
  password: 'eco_password',
  database: 'ecoecho_db',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

module.exports = pool;
