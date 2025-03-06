import React, { useState } from 'react';
import { submitBooking } from '../api';

const BookingForm = ({ vehicleId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const bookingData = {
      first_name: firstName,
      last_name: lastName,
      vehicle_id: vehicleId,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await submitBooking(bookingData);
      console.log('Booking submitted:', response);
      setSuccessMessage('Booking submitted successfully!');
    } catch (error) {
      console.error('Booking Error:', error.message);
      setError(error.message || "An unexpected error occurred."); // ✅ Show correct error
    } finally {
      setLoading(false);
    }
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

      {error && <div className="error-message" style={{ color: "red", fontWeight: "bold" }}>{error}</div>}
      {successMessage && <div className="success-message" style={{ color: "green", fontWeight: "bold" }}>{successMessage}</div>}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
