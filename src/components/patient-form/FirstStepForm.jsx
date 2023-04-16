import React from "react";
import FormWrapper from "./patient-form-wrapper/FormWrapper";

const FirstStepForm = ({ firstname, lastname, handleChangeFields }) => {
  return (
    <FormWrapper>
      <label>Firstname</label>
      <input
        value={firstname}
        type="text"
        onChange={(e) => handleChangeFields({ firstname: e.target.value })}
      />
      <label>Lastname</label>
      <input
        value={lastname}
        type="text"
        onChange={(e) => handleChangeFields({ lastname: e.target.value })}
      />
    </FormWrapper>
  );
};

export default FirstStepForm;
