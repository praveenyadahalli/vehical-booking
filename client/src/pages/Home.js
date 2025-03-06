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
    if (!startDate || !endDate) {
      setValidationError("Both start and end dates are required.");
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
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name <span className="required">*</span>:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </label>
            <label>
              End Date <span className="required">*</span>:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </label>
            {error && <p className="error">{error}</p>}
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