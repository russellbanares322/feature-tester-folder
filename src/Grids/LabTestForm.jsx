import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const LabTestForm = ({ selectedLabTest }) => {
  const [formData, setFormData] = useState({});
  const [savedFormData, setSavedFormData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidateForm()) {
      setSavedFormData(formData);
      setFormData({});
    } else {
      alert("Some fields are not yet filled");
    }
  };
  const handleValidateForm = () => {
    for (const fieldName in formData) {
      if (!formData[fieldName]) {
        return false;
      }
      return true;
    }
  };
  console.log(handleValidateForm());

  console.log(savedFormData);
  return (
    <div>
      {JSON.stringify(savedFormData)}
      <h1 key={selectedLabTest?.id}>{selectedLabTest?.displayName}</h1>
      {selectedLabTest?.additionalInformation?.map((field) => (
        <div key={field.id}>
          <h3>{field.displayName}</h3>
          <TextField
            id={field.id}
            onChange={handleChange}
            name={field.name}
            value={formData[field.name] || ""}
            type={field.type}
            required={field.isRequired}
          />
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        type="button"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </div>
  );
};

export default LabTestForm;
