import React, { useEffect, useState } from "react";
import { fetchVehiclesByType } from "../api";

const VehicleList = ({ typeId, onSelect }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!typeId) return; // Ensure typeId is set before fetching
      try {
        setLoading(true);
        const data = await fetchVehiclesByType(typeId);
        setVehicles(data);
      } catch (err) {
        setError("Failed to fetch vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [typeId]);

  return (
    <div>
      <h3>Select a Vehicle</h3>

      {loading && <p>Loading vehicles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              <button
                onClick={() => onSelect(vehicle.id)}
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "5px",
                }}
              >
                {vehicle.name}
              </button>
            </li>
          ))
        ) : (
          !loading && <p>No vehicles available.</p>
        )}
      </ul>
    </div>
  );
};

export default VehicleList;
