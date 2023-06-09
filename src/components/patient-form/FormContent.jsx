import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import FirstStepForm from "./FirstStepForm";
import FourthStepForm from "./FourthStepForm";
import SecondStepForm from "./SecondStepForm";
import SidePanelProgress from "./SidePanelProgress";
import ThirdStepForm from "./ThirdStepForm";

const INPUT_DATA = {
  firstname: "",
  lastname: "",
  gender: "",
  isActive: true,
  address: "",
  dateOfBirth: "",
  time: "",
  email: [],
};
const FormContent = () => {
  const [inputs, setInputs] = useState(INPUT_DATA);
  const [isDirty, setIsDirty] = useState(true);

  const handleChangeFields = (fields) => {
    setInputs((prev) => {
      return { ...prev, ...fields };
    });
    console.log(fields);
    setIsDirty(true);
  };

  const {
    steps,
    currentStepIndex,
    handleNext,
    handlePrev,
    step,
    isLastStep,
    isFirstStep,
  } = useMultiStepForm([
    <FirstStepForm inputs={inputs} handleChangeFields={handleChangeFields} />,
    <SecondStepForm {...inputs} handleChangeFields={handleChangeFields} />,
    <ThirdStepForm {...inputs} handleChangeFields={handleChangeFields} />,
    <FourthStepForm {...inputs} handleChangeFields={handleChangeFields} />,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setResult(inputs);
    setIsDirty(false);
  };

  const [result, setResult] = useState([]);

  useEffect(() => {
    window.onload = () => {
      window.addEventListener("beforeunload", (e) => {
        if (!isDirty) {
          return undefined;
        }

        let confirm = "Save";
        (e || window.event).returnValue = confirm;
        return confirm;
      });
    };
  }, [isDirty]);

  const [input, setInput] = useState({
    name: "",
    address: "",
  });
  const [inputErr, setInputErr] = useState({
    nameErr: false,
    addressErr: false,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    if (input.name.length > 0) {
      setInputErr({
        ...inputErr,
        nameErr: false,
      });
    }
    if (input.address.length > 0) {
      setInputErr({
        ...inputErr,
        addressErr: false,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      return setInputErr({
        nameErr: true,
      });
    }
    if (!input.address) {
      return setInputErr({
        addressErr: true,
      });
    }
    console.log(input);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        height: "100vh",
        width: "100%",
        flexWrap: "wrap-reverse",
      }}
    >
      <Box onSubmit={onSubmit} component="form">
        <TextField
          error={inputErr.nameErr}
          onChange={handleChange}
          type="text"
          label="name"
          helperText={inputErr.nameErr && "Name is required"}
        />
        <TextField
          error={inputErr.addressErr}
          onChange={handleChange}
          type="text"
          label="address"
          helperText={inputErr.addressErr && "Address is required"}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
      <form
        style={{
          border: "1px solid red",
          height: "15rem",
          marginRight: "auto",
          marginLeft: "12rem",
        }}
        onSubmit={handleSubmit}
      >
        {step}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={handlePrev}>
              Back
            </button>
          )}
          {!isLastStep && (
            <button onClick={handleNext} type="button">
              Next
            </button>
          )}
          {isLastStep && <button type="submit">Create Order</button>}
        </div>
      </form>
      <h1>{JSON.stringify(result)}</h1>
      <SidePanelProgress steps={steps} currentStepIndex={currentStepIndex} />
    </div>
  );
};

export default FormContent;
