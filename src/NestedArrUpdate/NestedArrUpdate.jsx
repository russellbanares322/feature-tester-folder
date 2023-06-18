import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button, Input, Modal } from "antd";
import React, { useState } from "react";

const options = [
  {
    id: 1,
    name: "Option 1",
    additionalReq: [
      {
        id: 200,
        requirementType: 0,
        requirementDetails: "First Name",
        isRequired: true,
      },
      {
        id: 201,
        requirementType: 1,
        requirementDetails: "Height",
        isRequired: true,
      },
      {
        id: 202,
        requirementType: 3,
        requirementDetails: "Gender",
        isRequired: true,
        values: ["Male", "Female"],
      },
    ],
  },
  {
    id: 2,
    name: "Option 2",
    additionalReq: [
      {
        id: 203,
        requirementType: 0,
        requirementDetails: "Last Name",
        isRequired: true,
      },
      {
        id: 999,
        requirementType: 3,
        requirementDetails: "Did you give a consent for this test?",
        values: ["Yes", "No"],
        isRequired: true,
      },
    ],
  },
  {
    id: 3,
    name: "Option 3",
    additionalReq: [],
  },
];

const NestedArrUpdate = () => {
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [savedOptions, setSavedOptions] = useState({
    clientId: 12345,
    patientId: 0,
    providerId: 0,
    diagnosisList: [],
    specialHandlingIds: [],
    testOrderDetails: [],
  });
  const [savedOptionData, setSavedOptionData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isForEdit, setIsForEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [dynamicInputs, setDynamicInputs] = useState([""]);

  const handleAddDynamicInput = () => {
    const addedInput = [...dynamicInputs, []];
    setDynamicInputs(addedInput);
  };

  const handleDeleteDynamicInput = (index) => {
    const filteredDynamicInput = dynamicInputs.filter(
      (_, idx) => idx !== index
    );
    setDynamicInputs(filteredDynamicInput);
  };

  const handleDynamicInputChange = (e, index) => {
    const inputData = [...dynamicInputs];
    inputData[index] = e.target.value;
    setDynamicInputs(inputData);
  };

  const handleSubmitDynamicInputs = () => {
    setDropdownOptions([
      ...dropdownOptions,
      {
        id: Math.floor(Math.random() * new Date(Date.now()) * 6),
        name: "Option 8",
        additionalReq: [
          {
            id: Math.floor(Math.random() * new Date(Date.now()) * 9 + 1),
            requirementType: 3,
            requirementDetails: "Are you old enough?",
            values: dynamicInputs,
          },
        ],
      },
    ]);
    setDynamicInputs([""]);
  };
  const inputTypeOptions = [
    {
      id: 0,
      type: "text",
    },
    {
      id: 1,
      type: "number",
    },
    {
      id: 2,
      type: "date",
    },
    {
      id: 3,
      type: "radio",
    },
    {
      id: 4,
      type: "checkbox",
    },
  ];

  const handleInputChange = (e, id) => {
    const inputValue = e.target.value;

    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      const index = updatedValues.findIndex((value) => value.id === id);
      if (index !== -1) {
        updatedValues[index] = { id, value: inputValue };
      } else {
        updatedValues.push({ id, value: inputValue });
      }

      return updatedValues;
    });
  };

  const handleSelectOption = (value) => {
    const savedOptionId = savedOptionData.map((option) => option.id);
    if (savedOptionId.includes(value.id)) return;
    if (!savedOptionId.includes(value.id) && value.additionalReq.length > 0) {
      setShowModal(true);
      setInputValues([]);
      setSelectedOption(value);
    }
  };

  const handleSelectOptionToEdit = (value) => {
    setIsForEdit(true);
    setInputValues(
      value.additionalReq.map((req) => {
        const existingData = savedOptions.testOrderDetails
          .find((detail) => detail.testId === value.id)
          ?.patientTestRequirementDatas[0]?.patientRequirementDataDetails.find(
            (data) => data.patientTestRequirementDataId === req.id
          );
        return {
          id: req.id,
          value: existingData ? existingData.dataValue : "",
        };
      })
    );
    setSelectedOption(value);
  };

  const handleCancel = () => {
    setShowModal(false);
    setIsForEdit(false);
  };

  const handleOk = () => {
    if (isForEdit) {
      const updatedTestOrderDetails = savedOptions.testOrderDetails.map(
        (detail) => {
          if (detail.testId === selectedOption.id) {
            const updatedPatientRequirementDataDetails =
              detail.patientTestRequirementDatas[0]?.patientRequirementDataDetails.map(
                (data) => {
                  const updatedValue = inputValues.find(
                    (input) => input.id === data.patientTestRequirementDataId
                  )?.value;
                  return {
                    ...data,
                    dataValue: updatedValue || data.dataValue,
                  };
                }
              );

            return {
              ...detail,
              patientTestRequirementDatas: [
                {
                  ...detail.patientTestRequirementDatas[0],
                  patientRequirementDataDetails:
                    updatedPatientRequirementDataDetails,
                },
              ],
            };
          }
          return detail;
        }
      );

      setSavedOptions({
        ...savedOptions,
        testOrderDetails: updatedTestOrderDetails,
      });
    } else {
      setSavedOptionData([...savedOptionData, selectedOption]);
      setSavedOptions({
        ...savedOptions,
        testOrderDetails: [
          ...savedOptions.testOrderDetails,
          {
            testId: selectedOption.id,
            status: "Ordered",
            patientTestRequirementDatas: [
              {
                testOrderDetailId: selectedOption.id,
                patientRequirementDataDetails: inputValues.map((input) => ({
                  patientTestRequirementDataId: input.id,
                  dataKey: input.id,
                  dataValue: input.value,
                })),
              },
            ],
          },
        ],
      });
    }

    setIsForEdit(false);
    setShowModal(false);
  };

  const isButtonDisabled = selectedOption?.additionalReq.some(
    (req) =>
      req.isRequired && !inputValues.find((value) => value.id === req.id)?.value
  );

  return (
    <div style={{ marginBottom: "3rem" }}>
      <pre>{JSON.stringify(savedOptions, null, 4)}</pre>
      <h1>DYNAMIC INPUTS</h1>
      <Button
        style={{ marginBottom: "1rem" }}
        onClick={handleAddDynamicInput}
        type="primary"
      >
        Add
      </Button>
      {dynamicInputs?.map((_, index) => (
        <Box sx={{ display: "flex", gap: "0.5rem" }} key={index}>
          <Input
            style={{ marginBottom: "0.5rem" }}
            onChange={(e) => handleDynamicInputChange(e, index)}
          />
          <Button
            style={{ opacity: index === 0 ? 0 : 1 }}
            onClick={() => handleDeleteDynamicInput(index)}
            type="primary"
            danger
          >
            X
          </Button>
        </Box>
      ))}
      <Button onClick={handleSubmitDynamicInputs} type="primary">
        Submit Inputs
      </Button>
      <br />
      <br />
      <br />
      <br />
      <hr />
      <h1>NESTED ARRAY UPDATE</h1>
      <Autocomplete
        onChange={(event, value) => {
          handleSelectOption(value);
        }}
        getOptionLabel={(option) => option.name}
        options={dropdownOptions}
        renderInput={(params) => (
          <TextField {...params} placeholder="Add data in table" />
        )}
        disableClearable
      />
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {savedOptionData.length > 0 &&
          savedOptionData.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelectOptionToEdit(option)}
              style={{
                backgroundColor: "gray",
                cursor: "pointer",
                height: "2rem",
                fontSize: "2rem",
              }}
            >
              <p>
                For <span style={{ fontWeight: "bold" }}>{option.name}</span>{" "}
                Test
              </p>
            </div>
          ))}
      </div>
      <Modal
        title="Dynamic Form"
        open={showModal || isForEdit}
        onOk={handleOk}
        okButtonProps={{
          disabled: isButtonDisabled,
        }}
        onCancel={handleCancel}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {selectedOption?.additionalReq.map((input) => (
            <div key={input.id}>
              <label>{input.requirementDetails}</label>
              {input.requirementType === 3 ? ( // Check if input type is radio
                input?.values.map((value, index) => (
                  <div key={value}>
                    <label>
                      <input
                        type="radio"
                        value={value}
                        checked={
                          inputValues.find((value) => value.id === input.id)
                            ?.value === value
                        }
                        onChange={(e) => handleInputChange(e, input.id)}
                      />
                      {value}
                    </label>
                  </div>
                ))
              ) : input.requirementType === 4 ? ( // Check if input type is checkbox
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="option1"
                      checked={
                        inputValues.find((value) => value.id === input.id)
                          ?.value || false
                      }
                      onChange={(e) => handleInputChange(e, input.id)}
                    />
                    Option 1
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="option2"
                      checked={
                        inputValues.find((value) => value.id === input.id)
                          ?.value || false
                      }
                      onChange={(e) => handleInputChange(e, input.id)}
                    />
                    Option 2
                  </label>
                </div>
              ) : (
                <TextField
                  key={input.id}
                  required={input.isRequired}
                  type={
                    inputTypeOptions.find(
                      (type) => type.id === input.requirementType
                    )?.type || "text"
                  }
                  value={
                    inputValues.find((value) => value.id === input.id)?.value ||
                    ""
                  }
                  onChange={(e) => handleInputChange(e, input.id)}
                />
              )}
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default NestedArrUpdate;
