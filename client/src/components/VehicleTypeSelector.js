import React, { useEffect, useState } from "react";
import { fetchVehicleTypes } from "../api";

const VehicleTypeSelector = ({ wheels, onSelect }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const types = await fetchVehicleTypes(wheels);
      setVehicleTypes(types);
    };
    fetchTypes();
  }, [wheels]);

  return (
    <div>
      <h3>Select Vehicle Type</h3>
      {vehicleTypes.map((type) => (
        <label key={type.id} className="radio-label">
          <input
            type="radio"
            name="vehicleType"
            value={type.id}
            onChange={() => onSelect(type.id)}
          />
          {type.name}
        </label>
      ))}
    </div>
  );
};

export default VehicleTypeSelector;
