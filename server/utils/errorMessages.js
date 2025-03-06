// utils/errorMessages.js
const fs = require('fs');
const path = require('path');

const errorMessages = {};

// Load the properties file
const propertiesFilePath = path.join(__dirname, '..', 'errormessage.properties');
const propertiesFileContent = fs.readFileSync(propertiesFilePath, 'utf-8');

// Parse the properties file
propertiesFileContent.split('\n').forEach((line) => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    errorMessages[key.trim()] = value.trim();
  }
});

// Function to get error message by code
const getErrorMessage = (errorCode) => {
  return errorMessages[errorCode] || 'Unknown error';
};

module.exports = { getErrorMessage };