const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "postgres"
});

// Test the database connection
// const testConnection = async () => {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('Database connection successful:', res.rows[0]);

//     // Test query: Fetch vehicle types by wheels
//     const wheels = 2; // Example: Fetch vehicle types with 2 wheels
//     const vehicleTypesQuery = 'SELECT * FROM vehicles WHERE type_id = $1';
//     const vehicleTypesRes = await pool.query(vehicleTypesQuery, [wheels]);
//     console.log('Log types with', wheels, 'wheels:', vehicleTypesRes.rows);
//   } catch (error) {
//     console.error('Database connection or query failed:', error);
//   }
// };

// Call the test function
// testConnection();

module.exports = pool;