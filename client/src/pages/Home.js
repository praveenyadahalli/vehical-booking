import React, { useState } from "react";
import VehicleTypeSelector from "../components/VehicleTypeSelector";
import VehicleList from "../components/VehicleList";
import { submitBooking } from "../api"; // ✅ Import the API function
import "./Home.css";

const Home = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wheels, setWheels] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = () => setStep((prevStep) => prevStep + 1);

  const handleWheelsChange = (value) => {
    setWheels(value);
    setStep(3);
  };

  const handleTypeSelect = (typeId) => {
    setSelectedTypeId(typeId);
    setStep(4);
  };

  const handleVehicleSelect = (vehicleId) => {
    console.log("Vehicle Selected:", vehicleId);
    setSelectedVehicleId(vehicleId);
    setTimeout(() => {
      setStep(5);
    }, 100);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const bookingData = {
      first_name: firstName,
      last_name: lastName,
      vehicle_id: selectedVehicleId,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await submitBooking(bookingData);
      console.log("Booking Response:", response);

      if (response.error) {
        setError(response.error);
      } else {
        alert("Booking submitted successfully!");
        setStep(1); // Reset the form after successful submission
      }
    } catch (err) {
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Vehicle Booking</h1>

      {step === 1 && (
        <div>
          <h2>Step 1: Enter Your Name</h2>
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
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Select Number of Wheels</h2>
          <label>
            <input
              type="radio"
              name="wheels"
              value={2}
              checked={wheels === 2}
              onChange={() => handleWheelsChange(2)}
            />{" "}
            2 Wheels
          </label>
          <label>
            <input
              type="radio"
              name="wheels"
              value={4}
              checked={wheels === 4}
              onChange={() => handleWheelsChange(4)}
            />{" "}
            4 Wheels
          </label>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Select Vehicle Type</h2>
          <VehicleTypeSelector wheels={wheels} onSelect={handleTypeSelect} />
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Step 4: Select Vehicle Model</h2>
          <VehicleList typeId={selectedTypeId} onSelect={handleVehicleSelect} />
        </div>
      )}

      {step === 5 && (
        <div>
          <h2>Step 5: Select Date Range</h2>
          <form onSubmit={handleBookingSubmit}>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
