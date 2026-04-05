require("dotenv").config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'DATA',
  waitForConnections: true,
  connectionLimit: 10
});

const initDB = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      category VARCHAR(100) DEFAULT 'General',
      dueDate DATETIME,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

initDB();

module.exports = pool;