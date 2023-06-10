import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Modal } from "antd";
import React, { useState } from "react";

const NestedArrUpdate = () => {
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
  const dropdownOptions = [
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
          requirementType: 2,
          requirementDetails: "Birthdate",
          isRequired: true,
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
      ],
    },
    {
      id: 3,
      name: "Option 3",
      additionalReq: [],
    },
  ];

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
      <br />
      <pre>{JSON.stringify(inputValues, null, 4)}</pre>
      <br />
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
          {selectedOption &&
            selectedOption?.additionalReq.map((input) => (
              <>
                <label>{input.requirementDetails}</label>
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
              </>
            ))}
        </Box>
      </Modal>
    </div>
  );
};

export default NestedArrUpdate;
