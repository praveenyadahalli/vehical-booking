const express = require('express');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

// Use routes
app.use('/api', vehicleRoutes);
app.use('/api', bookingRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});