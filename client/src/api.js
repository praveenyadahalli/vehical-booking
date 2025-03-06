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

    // Check if the response is OK and if it has content
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Booking request failed.");
    }

    // Check if the response has content before calling .json()
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Response is not JSON.");
    }
  } catch (error) {
    console.error("Error submitting booking:", error.message);
    throw error; // Ensure error propagates
  }
};

export const fetchAllVehiclesTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicle-types/all`);
  return response.json();
};