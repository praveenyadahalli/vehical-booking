import React from "react";
import { validateDateRange } from "../../helpers/validators";

const Step5DatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  validationError,
  setValidationError, // Add setValidationError prop
  error,
  loading,
  onSubmit,
}) => {
  return (
    <div>
      <h2>Step 5: Select Date Range</h2>
      <form onSubmit={onSubmit}>
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
                setValidationError(""); // Clear validation error if valid
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
  );
};

export default Step5DatePicker;