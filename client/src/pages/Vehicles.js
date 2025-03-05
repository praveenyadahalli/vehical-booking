import React, { useState } from 'react';
import VehicleTypeSelector from '../components/VehicleTypeSelector';
import VehicleList from '../components/VehicleList';

const Vehicles = () => {
  const [selectedTypeId, setSelectedTypeId] = useState(null);

  return (
    <div className="container">
      <h1>Vehicles</h1>
      <VehicleTypeSelector onSelect={setSelectedTypeId} />
      {selectedTypeId && <VehicleList typeId={selectedTypeId} />}
    </div>
  );
};

export default Vehicles;