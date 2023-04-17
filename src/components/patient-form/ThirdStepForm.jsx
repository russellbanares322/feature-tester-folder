import React from "react";
import FormWrapper from "./patient-form-wrapper/FormWrapper";

const ThirdStepForm = ({ address, handleChangeFields }) => {
  return (
    <FormWrapper>
      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => handleChangeFields({ address: e.target.value })}
      />
    </FormWrapper>
  );
};

export default ThirdStepForm;
