import React from "react";
import VehicleTypeSelector from "../VehicleTypeSelector";

const Step3VehicleTypeSelector = ({ wheels, selectedTypeId, setSelectedTypeId, validationError, onNext }) => {
  return (
    <div>
      <h2>Step 3: Select Vehicle Type</h2>
      <VehicleTypeSelector wheels={wheels} onSelect={setSelectedTypeId} />
      {validationError && <p className="error">{validationError}</p>}
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Step3VehicleTypeSelector;