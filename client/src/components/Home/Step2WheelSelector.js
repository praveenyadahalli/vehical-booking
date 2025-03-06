import React from "react";

const Step2WheelSelector = ({ wheels, setWheels, wheelOptions, validationError, onNext }) => {
  return (
    <div>
      <h2>Step 2: Select Number of Wheels</h2>
      {wheelOptions.length > 0 ? (
        wheelOptions.map((wheelCount) => (
          <label key={wheelCount} className="radio-label">
            <input
              type="radio"
              name="wheels"
              value={wheelCount}
              checked={wheels === wheelCount}
              onChange={() => setWheels(wheelCount)}
            />{" "}
            {wheelCount} Wheels
          </label>
        ))
      ) : (
        <p>Loading wheel options...</p>
      )}
      {validationError && <p className="error">{validationError}</p>}
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Step2WheelSelector;