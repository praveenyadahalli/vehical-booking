import React from "react";
import VehicleList from "../VehicleList";

const Step4VehicleList = ({ selectedTypeId, selectedVehicleId, setSelectedVehicleId, validationError, onNext }) => {
  return (
    <div>
      <h2>Step 4: Select Vehicle Model</h2>
      <VehicleList typeId={selectedTypeId} onSelect={setSelectedVehicleId} />
      {validationError && <p className="error">{validationError}</p>}
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Step4VehicleList;