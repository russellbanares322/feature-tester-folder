import React, { useState } from "react";
import FormModal from "./FormModal";
import FormWrapper from "./patient-form-wrapper/FormWrapper";

const FirstStepForm = ({ inputs, handleChangeFields }) => {
  const [isPatientNew, setIsPatientNew] = useState(false);

  const handleOpenModal = () => {
    setIsPatientNew(true);
  };
  const handleCloseModal = () => {
    setIsPatientNew(false);
  };
  return (
    <FormWrapper>
      <h5>{inputs.firstname}</h5>
      <h5>{inputs.lastname}</h5>
      <label>Firstname</label>
      <br />
      <button type="button" onClick={handleOpenModal}>
        Add new
      </button>
      <br />
      <input
        value={inputs.firstname}
        type="text"
        onChange={(e) => handleChangeFields({ firstname: e.target.value })}
      />
      <label>Lastname</label>
      <input
        value={inputs.lastname}
        type="text"
        onChange={(e) => handleChangeFields({ lastname: e.target.value })}
      />
      {isPatientNew && (
        <FormModal
          handleCloseModal={handleCloseModal}
          handleChangeFields={handleChangeFields}
          inputs={inputs}
        />
      )}
    </FormWrapper>
  );
};

export default FirstStepForm;
