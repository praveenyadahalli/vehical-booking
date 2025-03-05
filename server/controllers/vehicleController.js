const pool = require('../db-connect.js');

// Fetch vehicle types based on number of wheels
const getVehicleTypes = async (req, res) => {
  const { wheels } = req.query;
  try {
    const query = 'SELECT * FROM vehicle_types WHERE wheels = $1';
    const { rows } = await pool.query(query, [wheels]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
};

// Fetch vehicles by type
const getVehiclesByType = async (req, res) => {
  const { typeId } = req.query; // Use req.query to get typeId
  console.log('Fetching vehicles for typeId:', typeId); // Debug log

  try {
    const query = 'SELECT * FROM vehicles WHERE type_id = $1';
    const { rows } = await pool.query(query, [typeId]); // Use typeId here
    console.log('Vehicles by Type Id fetched:', rows); // Debug log

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No vehicles found for the given typeId' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

module.exports = { getVehicleTypes, getVehiclesByType };