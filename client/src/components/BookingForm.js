import React, { useState } from 'react';
import { submitBooking } from '../api';

const BookingForm = ({ vehicleId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      first_name: firstName,
      last_name: lastName,
      vehicle_id: vehicleId,
      start_date: startDate,
      end_date: endDate,
    };
    const response = await submitBooking(bookingData);
    console.log('Booking submitted:', response);
    alert('Booking submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;