import React, { useState } from "react";

const LabTestForm = ({ selectedLabTest }) => {
  const [formInputs, setFormInputs] = useState({
    height: 0,
    weight: 0,
    mestrualPeriodTime: "",
    mestrualPeriodDate: "",
  });

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      {JSON.stringify(formInputs)}
      <h1 key={selectedLabTest?.id}>{selectedLabTest?.displayName}</h1>
      {selectedLabTest?.additionalInformation?.map((input) => (
        <div key={input.id}>
          <h3>{input.displayName}</h3>
          <input
            onChange={handleChange}
            name={input.name}
            value={formInputs[input.name]}
            type={input.type}
            required={input.isRequired}
          />
        </div>
      ))}
    </div>
  );
};

export default LabTestForm;
