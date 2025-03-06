// helpers/validators.js
import { ERROR_MESSAGES } from "./errorMessages";

// Validate alphabetic input
export const validateAlphabeticInput = (value) => {
  return /^[A-Za-z]+$/.test(value); // Allows only letters (no numbers or special characters)
};

// Validate date range
export const validateDateRange = (startDate, endDate) => {
  const today = new Date().toISOString().split("T")[0];
  if (!startDate || !endDate) {
    return ERROR_MESSAGES.DATE_RANGE_REQUIRED;
  }
  if (startDate < today) {
    return ERROR_MESSAGES.START_DATE_PAST;
  }
  if (endDate < startDate) {
    return ERROR_MESSAGES.END_DATE_BEFORE_START;
  }
  return null; // No error
};