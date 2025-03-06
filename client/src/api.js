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
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response as JSON
      throw new Error(errorData.error || "Booking request failed.");
    }

    // Parse the successful response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting booking:", error.message);
    throw error; // Ensure error propagates
  }
};

export const fetchAllVehiclesTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicle-types/all`);
  return response.json();
};