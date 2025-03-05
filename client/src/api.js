const API_BASE_URL = 'http://localhost:5000/api';

export const fetchVehicleTypes = async (wheels) => {
  const response = await fetch(`${API_BASE_URL}/vehicle-types?wheels=${wheels}`);
  return response.json();
};

export const fetchVehiclesByType = async (typeId) => {
  const response = await fetch(`${API_BASE_URL}/vehicles?typeId=${typeId}`);
  return response.json();
};

export const submitBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};

export const fetchAllVehiclesTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicle-types/all`);
  return response.json();
};