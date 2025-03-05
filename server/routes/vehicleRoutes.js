const express = require('express');
const { getVehicleTypes, getVehiclesByType } = require('../controllers/vehicleController');

const router = express.Router();

// GET /api/vehicle-types?wheels=2
router.get('/vehicle-types', getVehicleTypes);

// GET /api/vehicles?typeId=2
router.get('/vehicles', getVehiclesByType);

module.exports = router;