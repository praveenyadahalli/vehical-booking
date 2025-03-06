import React from "react";
import { validateAlphabeticInput } from "../../helpers/validators";

const Step1NameForm = ({ firstName, setFirstName, lastName, setLastName, validationError, onNext }) => {
  return (
    <div>
      <h2>Step 1: Enter Your Name</h2>
      <label>
        First Name <span className="required">*</span>:
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            const value = e.target.value;
            if ((validateAlphabeticInput(value) || value === "") && value.length <= 15) {
              setFirstName(value);
            }
          }}
          maxLength={15} // Limit to 15 characters
          required
        />
      </label>
      <label>
        Last Name <span className="required">*</span>:
        <input
          type="text"
          value={lastName}
          onChange={(e) => {
            const value = e.target.value;
            if ((validateAlphabeticInput(value) || value === "") && value.length <= 15) {
              setLastName(value);
            }
          }}
          maxLength={15} // Limit to 15 characters
          required
        />
      </label>
      {validationError && <p className="error">{validationError}</p>}
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Step1NameForm;