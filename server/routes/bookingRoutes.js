const express = require('express');
const { submitBooking } = require('../controllers/bookingController');

const router = express.Router();

// POST /api/bookings
router.post('/bookings', submitBooking);

module.exports = router;