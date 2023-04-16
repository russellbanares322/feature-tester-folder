import React from "react";
import FormWrapper from "./patient-form-wrapper/FormWrapper";

const SecondStepForm = ({ gender, isActive, handleChangeFields }) => {
  return (
    <FormWrapper>
      <label>Gender</label>
      <input
        name="gender"
        value="Male"
        checked={gender === "Male"}
        type="radio"
        onChange={(e) => handleChangeFields({ gender: e.target.value })}
      />
      <input
        name="gender"
        value="Female"
        checked={gender === "Female"}
        type="radio"
        onChange={(e) => handleChangeFields({ gender: e.target.value })}
      />
      <label>isActive</label>
      <input
        type="radio"
        name="isActive"
        value="Yes"
        checked={isActive === "Yes"}
        onChange={(e) => handleChangeFields({ isActive: e.target.value })}
      />
      <input
        type="radio"
        name="isActive"
        value="No"
        checked={isActive === "No"}
        onChange={(e) => handleChangeFields({ isActive: e.target.value })}
      />
    </FormWrapper>
  );
};

export default SecondStepForm;
