import React, { useEffect, useState } from "react";
import { fetchVehiclesByType } from "../api";

const VehicleList = ({ typeId, onSelect }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!typeId) return;
      const data = await fetchVehiclesByType(typeId);
      setVehicles(data);
    };
    fetchVehicles();
  }, [typeId]);

  return (
    <div>
      <h3>Select Vehicle Model</h3>
      {vehicles.map((vehicle) => (
        <label key={vehicle.id} className="radio-label">
          <input
            type="radio"
            name="vehicle"
            value={vehicle.id}
            onChange={() => onSelect(vehicle.id)}
          />
          {vehicle.name}
        </label>
      ))}
    </div>
  );
};

export default VehicleList;
