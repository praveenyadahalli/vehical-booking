import React from 'react';
import BookingForm from '../components/BookingForm';

const Bookings = () => {
  const vehicleId = 1; // Default vehicle ID

  return (
    <div className="container">
      <h1>Book a Vehicle</h1>
      <BookingForm vehicleId={vehicleId} />
    </div>
  );
};

export default Bookings;