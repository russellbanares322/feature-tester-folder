import React from "react";
import FormWrapper from "./patient-form-wrapper/FormWrapper";

const FourthStepForm = ({ dateOfBirth, time, handleChangeFields }) => {
  return (
    <FormWrapper>
      <label>Birthdate</label>
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => handleChangeFields({ dateOfBirth: e.target.value })}
      />
      <label>Selected Time</label>
      <input
        type="time"
        value={time}
        onChange={(e) => handleChangeFields({ time: e.target.value })}
      />
    </FormWrapper>
  );
};

export default FourthStepForm;
