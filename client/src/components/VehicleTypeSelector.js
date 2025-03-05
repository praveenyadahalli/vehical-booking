import React, { useEffect, useState } from 'react';
import { fetchVehicleTypes } from '../api';

const VehicleTypeSelector = ({ wheels, onSelect }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        const types = await fetchVehicleTypes(wheels);
        setVehicleTypes(types);
      } catch (err) {
        setError("Failed to fetch vehicle types.");
      } finally {
        setLoading(false);
      }
    };

    if (wheels) {
      fetchTypes();
    }
  }, [wheels]);

  return (
    <div>
      <h3>Vehicle Types</h3>

      {loading && <p>Loading vehicle types...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {vehicleTypes.length > 0 ? (
          vehicleTypes.map((type) => (
            <li key={type.id}>
              <button
                onClick={() => onSelect(type.id)}
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "5px"
                }}
              >
                {type.name}
              </button>
            </li>
          ))
        ) : (
          !loading && <p>No vehicle types found.</p>
        )}
      </ul>
    </div>
  );
};

export default VehicleTypeSelector;
