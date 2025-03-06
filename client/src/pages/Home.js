import React, { useState, useEffect } from "react";
import VehicleTypeSelector from "../components/VehicleTypeSelector";
import VehicleList from "../components/VehicleList";
import { submitBooking, fetchAllVehiclesTypes } from "../api";
import "../styles/Home.css";

const Home = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wheels, setWheels] = useState(null);
  const [wheelOptions, setWheelOptions] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");

  // Fetch wheel options on component mount
  useEffect(() => {
    const fetchWheels = async () => {
      try {
        const vehicles = await fetchAllVehiclesTypes();
        const uniqueWheels = [...new Set(vehicles.map((v) => v.wheels))];
        setWheelOptions(uniqueWheels);
      } catch (err) {
        setError("Failed to fetch wheel options.");
      }
    };

    fetchWheels();
  }, []);

  // Helper function to validate alphabetic input
  const validateAlphabeticInput = (value) => {
    return /^[A-Za-z]+$/.test(value); // Allows only letters (no numbers or special characters)
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (step === 1 && (!firstName.trim() || !lastName.trim())) {
      setValidationError("First Name and Last Name are required.");
      return;
    }
    if (step === 2 && wheels === null) {
      setValidationError("Please select the number of wheels.");
      return;
    }
    if (step === 3 && selectedTypeId === null) {
      setValidationError("Please select a vehicle type.");
      return;
    }
    if (step === 4 && selectedVehicleId === null) {
      setValidationError("Please select a vehicle model.");
      return;
    }

    setValidationError("");
    setStep((prevStep) => prevStep + 1);
  };

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate date range
    if (!startDate || !endDate) {
      setValidationError("Both start and end dates are required.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (startDate < today) {
      setValidationError("Start date cannot be in the past.");
      return;
    }

    if (endDate < startDate) {
      setValidationError("End date must be on or after the start date.");
      return;
    }

    setLoading(true);
    setValidationError("");
    setError(null);

    try {
      const bookingData = {
        first_name: firstName,
        last_name: lastName,
        vehicle_id: selectedVehicleId,
        start_date: startDate,
        end_date: endDate,
      };

      const response = await submitBooking(bookingData);
      alert("Booking successful!");
      setStep(1); // Reset form after successful submission
      // Reset all fields
      setFirstName("");
      setLastName("");
      setWheels(null);
      setSelectedTypeId(null);
      setSelectedVehicleId(null);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      setError(error.message || "Failed to submit booking. Please try again.");
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
            First Name <span className="required">*</span>:
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                const value = e.target.value;
                if ((validateAlphabeticInput(value) || value === "") && value.length <= 15) {
                  setFirstName(value);
                }
              }}
              maxLength={15} // Limit to 15 characters
              required
            />
          </label>
          <label>
            Last Name <span className="required">*</span>:
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                const value = e.target.value;
                if ((validateAlphabeticInput(value) || value === "") && value.length <= 15) {
                  setLastName(value);
                }
              }}
              maxLength={15} // Limit to 15 characters
              required
            />
          </label>
          {validationError && <p className="error">{validationError}</p>}
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Select Number of Wheels</h2>
          {wheelOptions.length > 0 ? (
            wheelOptions.map((wheelCount) => (
              <label key={wheelCount} className="radio-label">
                <input
                  type="radio"
                  name="wheels"
                  value={wheelCount}
                  checked={wheels === wheelCount}
                  onChange={() => setWheels(wheelCount)}
                />{" "}
                {wheelCount} Wheels
              </label>
            ))
          ) : (
            <p>Loading wheel options...</p>
          )}
          {validationError && <p className="error">{validationError}</p>}
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Select Vehicle Type</h2>
          <VehicleTypeSelector wheels={wheels} onSelect={setSelectedTypeId} />
          {validationError && <p className="error">{validationError}</p>}
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Step 4: Select Vehicle Model</h2>
          <VehicleList typeId={selectedTypeId} onSelect={setSelectedVehicleId} />
          {validationError && <p className="error">{validationError}</p>}
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2>Step 5: Select Date Range</h2>
          <form onSubmit={handleBookingSubmit}>
            <label>
              Start Date <span className="required">*</span>:
              <input
                type="date"
                value={startDate}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
                onChange={(e) => {
                  const selectedStartDate = e.target.value;
                  setStartDate(selectedStartDate);
                  if (endDate && selectedStartDate > endDate) {
                    setEndDate(""); // Reset endDate if it's before the new startDate
                  }
                }}
                required
              />
            </label>
            <label>
              End Date <span className="required">*</span>:
              <input
                type="date"
                value={endDate}
                min={startDate || new Date().toISOString().split("T")[0]} // Ensure endDate >= startDate
                onChange={(e) => {
                  const selectedEndDate = e.target.value;
                  if (!startDate || selectedEndDate >= startDate) {
                    setEndDate(selectedEndDate);
                  } else {
                    setValidationError("End date must be on or after the start date.");
                  }
                }}
                required
              />
            </label>
            {error && <p className="error">{error}</p>}
            {validationError && <p className="error">{validationError}</p>}
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