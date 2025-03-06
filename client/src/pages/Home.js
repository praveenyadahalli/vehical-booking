import React, { useState, useEffect } from "react";
import Step1NameForm from "../components/Home/Step1NameForm";
import Step2WheelSelector from "../components/Home/Step2WheelSelector";
import Step3VehicleTypeSelector from "../components/Home/Step3VehicleTypeSelector";
import Step4VehicleList from "../components/Home/Step4VehicleList";
import Step5DatePicker from "../components/Home/Step5DatePicker";
import { fetchAllVehiclesTypes, submitBooking } from "../api";
import { validateDateRange } from "../helpers/validators"; // Import validation functions
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

    // Validate date range using the helper function
    const dateError = validateDateRange(startDate, endDate);
    if (dateError) {
      setValidationError(dateError); // Set validation error state
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
        <Step1NameForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          validationError={validationError}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <Step2WheelSelector
          wheels={wheels}
          setWheels={setWheels}
          wheelOptions={wheelOptions}
          validationError={validationError}
          onNext={handleNext}
        />
      )}

      {step === 3 && (
        <Step3VehicleTypeSelector
          wheels={wheels}
          selectedTypeId={selectedTypeId}
          setSelectedTypeId={setSelectedTypeId}
          validationError={validationError}
          onNext={handleNext}
        />
      )}

      {step === 4 && (
        <Step4VehicleList
          selectedTypeId={selectedTypeId}
          selectedVehicleId={selectedVehicleId}
          setSelectedVehicleId={setSelectedVehicleId}
          validationError={validationError}
          onNext={handleNext}
        />
      )}

      {step === 5 && (
        <Step5DatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          validationError={validationError}
          setValidationError={setValidationError} 
          error={error}
          loading={loading}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default Home;