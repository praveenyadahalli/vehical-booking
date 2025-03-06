// helpers/validators.js

// Validate alphabetic input
export const validateAlphabeticInput = (value) => {
    return /^[A-Za-z]+$/.test(value); // Allows only letters (no numbers or special characters)
  };
  
  // Validate date range
  export const validateDateRange = (startDate, endDate) => {
    const today = new Date().toISOString().split("T")[0];
    if (!startDate || !endDate) {
      return "Both start and end dates are required.";
    }
    if (startDate < today) {
      return "Start date cannot be in the past.";
    }
    if (endDate < startDate) {
      return "End date must be on or after the start date.";
    }
    return null; // No error
  };