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
        checked={isActive === true}
        onChange={(e) => handleChangeFields({ isActive: true })}
      />
      <input
        type="radio"
        name="isActive"
        value="No"
        checked={isActive === false}
        onChange={(e) => handleChangeFields({ isActive: false })}
      />
    </FormWrapper>
  );
};

export default SecondStepForm;
