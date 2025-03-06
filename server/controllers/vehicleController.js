const pool = require('../db-connect.js');
const { getErrorMessage } = require('../utils/errorMessages');

// Fetch vehicle types based on number of wheels
const getVehicleTypes = async (req, res) => {
  const { wheels } = req.query;
  try {
    const query = 'SELECT * FROM vehicle_types WHERE wheels = $1';
    const { rows } = await pool.query(query, [wheels]);

    if (rows.length === 0) {
      return res.status(404).json({ error: getErrorMessage('error.vehicle.types.not_found') });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: getErrorMessage('error.vehicle.types.fetch_failed') });
  }
};

// Fetch vehicles by type
const getVehiclesByType = async (req, res) => {
  const { typeId } = req.query;
  try {
    const query = 'SELECT * FROM vehicles WHERE type_id = $1';
    const { rows } = await pool.query(query, [typeId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: getErrorMessage('error.vehicles.not_found') });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: getErrorMessage('error.vehicles.fetch_failed') });
  }
};

// Fetch all vehicle types
const getAllVehicleTypes = async (req, res) => {
  try {
    const query = 'SELECT * FROM vehicle_types';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all vehicle types:', error);
    res.status(500).json({ error: getErrorMessage('error.all_vehicle_types.fetch_failed') });
  }
};

module.exports = { getVehicleTypes, getVehiclesByType, getAllVehicleTypes };