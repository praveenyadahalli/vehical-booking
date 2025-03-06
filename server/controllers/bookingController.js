const pool = require('../db-connect.js');
const { getErrorMessage } = require('../utils/errorMessages');

// Submit a booking
const submitBooking = async (req, res) => {
  const { first_name, last_name, vehicle_id, start_date, end_date } = req.body;
  try {
    // Parse dates to ensure they are in the correct format
    const parsedStartDate = new Date(start_date).toISOString().split('T')[0];
    const parsedEndDate = new Date(end_date).toISOString().split('T')[0];

    // Check if the vehicle is available
    const availabilityQuery = `
      SELECT * FROM bookings
      WHERE vehicle_id = $1
      AND (start_date <= $3 AND end_date >= $2)
    `;
    const { rows } = await pool.query(availabilityQuery, [vehicle_id, parsedStartDate, parsedEndDate]);

    if (rows.length > 0) {
      return res.status(400).json({ error: getErrorMessage('error.vehicle.booked') });
    }

    // Insert the booking
    const insertQuery = `
      INSERT INTO bookings (first_name, last_name, vehicle_id, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const newBooking = await pool.query(insertQuery, [first_name, last_name, vehicle_id, parsedStartDate, parsedEndDate]);

    // Format the dates to only include the date part
    const formattedBooking = {
      ...newBooking.rows[0],
      start_date: newBooking.rows[0].start_date.toISOString().split('T')[0],
      end_date: newBooking.rows[0].end_date.toISOString().split('T')[0],
    };

    res.json(formattedBooking);
  } catch (error) {
    console.error('Error submitting booking:', error);
    res.status(500).json({ error: getErrorMessage('error.booking.failed') });
  }
};

module.exports = { submitBooking };