// MySQL connection using mysql2
const mysql = require('mysql2/promise');

// Read environment variables or hardcode for testing
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'pesa_yangu_db';

async function initialize() {
  // Create a connection pool
  const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Optional: test connection
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err);
    process.exit(1);
  }

  return pool;
}

module.exports = { initialize };


