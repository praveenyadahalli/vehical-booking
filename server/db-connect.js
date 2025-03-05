const { Pool } = require('pg');

// Create a new connection pool
const pool = new Pool({
  user: 'postgres',       
  password: 'root',       
  host: 'localhost',      
  port: 5432,            
  database: 'test'       
});

// Export the pool for use in other files
module.exports = pool;