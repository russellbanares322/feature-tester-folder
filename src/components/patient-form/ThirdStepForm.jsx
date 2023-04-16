import React from "react";
import FormWrapper from "./patient-form-wrapper/FormWrapper";

const ThirdStepForm = ({ address, email, handleChangeFields }) => {
  return (
    <FormWrapper>
      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => handleChangeFields({ address: e.target.value })}
      />
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => handleChangeFields({ email: e.target.value })}
      />
    </FormWrapper>
  );
};

export default ThirdStepForm;
