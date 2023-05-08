import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  TextField,
  Typography,
} from "@mui/material";
const codes = [
  { id: 1, code: "testing A" },
  { id: 2, code: "testing B" },
  { id: 3, code: "testing C" },
  { id: 4, code: "testing D" },
];

const filter = createFilterOptions();

const AutoComplete = () => {
  const [step, setStep] = useState(1);
  const [codeOptions, setCodeOptions] = useState(codes);
  const [value, setValue] = useState(null);

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prevStep) => Math.min(2, prevStep + 1));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };
  const [codeInputs, setCodeInputs] = useState({
    id: Math.random(),
    code: "",
  });
  const [codesArr, setCodesArr] = useState([]);
  const [selectedCodeId, setSelectedCodeId] = useState(null);

  const handleSelectCode = (event, selectedCode) => {
    if (event.key !== "Enter") {
      setCodesArr([
        ...codesArr,
        { id: selectedCode.id, code: selectedCode.code },
      ]);
      setValue(null);
    }
    setCodeInputs({
      code: "",
    });
  };

  //UPDATED VALIDATION

  const handleSelectCodeFromDropdown = (selectedCode) => {
    if (!codesArr.includes(selectedCode)) {
      return setCodesArr([...codesArr, selectedCode]);
    } else {
      alert(`${selectedCode.code} is already added`);
    }
  };

  const handleEnterCode = (e) => {
    const codeName = codesArr.map((c) => c.code);
    if (
      e.key === "Enter" &&
      selectedCodeId === null &&
      !codeName.includes(codeInputs.code)
    ) {
      setCodesArr([...codesArr, { id: Math.random(), code: codeInputs.code }]);
      setCodeInputs({
        id: 0,
        code: "",
      });
    }

    if (e.key === "Enter" && selectedCodeId !== null) {
      setCodesArr((prevCodesArr) =>
        prevCodesArr.map((c) =>
          c.id === selectedCodeId ? { ...c, ...codeInputs } : c
        )
      );
      setSelectedCodeId(null);
      setCodeInputs({
        id: 0,
        code: "",
      });
    }

    if (codeName.includes(codeInputs.code)) {
      return alert(`${codeInputs.code} is already in the list.`);
    }
  };

  const handleSelectCodeToEdit = (selectedCode) => {
    if (!codeOptions.includes(selectedCode)) {
      setCodeInputs({ ...selectedCode });
      setSelectedCodeId(selectedCode.id);
    }
  };

  const handleChange = (e) => {
    setCodeInputs({ code: e.target.value });
  };

  const handleAddCodeInDropdown = (e) => {
    if (e.key === "Enter") {
      setCodeOptions([
        ...codeOptions,
        { id: Math.random(), code: codeInputs.code },
      ]);
      setCodeInputs({
        code: "",
      });
      setValue(null);
    }
  };

  const handleDeleteDataFromTable = (selectedId) => {
    const filteredCodesArr = codesArr.filter((c) => c.id !== selectedId);
    setCodesArr(filteredCodesArr);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 0",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "red" }}>{step}</h1>

      <Button
        type="button"
        onClick={handleNext}
        variant="contained"
        color="primary"
      >
        Next
      </Button>
      <Button
        type="button"
        onClick={handlePrev}
        variant="contained"
        color="primary"
      >
        Prev
      </Button>
      <h1>Mini table data</h1>
      {JSON.stringify(codesArr)}
      <h1>Select options data</h1>
      {JSON.stringify(codeOptions)}

      {/* IMPLEMENTATION OF POSTING CUSTOM DATA IN API */}
      {step === 1 && (
        <Box>
          <Autocomplete
            selectOnFocus
            clearOnBlur
            freeSolo
            disableClearable
            getOptionLabel={(option) => {
              if (option.id && option.code) {
                return `${option.code}`;
              }

              if (typeof option === "string") {
                return option;
              }

              if (option.inputValue) {
                return option.inputValue;
              }

              return option.code;
            }}
            onChange={(event, newInputValue) => {
              handleSelectCode(event, newInputValue);
              if (typeof newInputValue === "string") {
                setValue({
                  code: newInputValue,
                });
              } else if (newInputValue && newInputValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  code: newInputValue.inputValue,
                });
              } else {
                setValue(newInputValue);
              }
            }}
            options={codeOptions}
            sx={{ width: 300, backgroundColor: "white" }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.code
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  code: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            renderOption={(props, option) => <li {...props}>{option.code}</li>}
            renderInput={(params) => (
              <TextField
                name="code"
                value={codeInputs.code}
                onKeyDown={(e) => handleAddCodeInDropdown(e)}
                onChange={handleChange}
                {...params}
                placeholder="Add code in dropdown"
              />
            )}
          />
        </Box>
      )}

      {/* IMPLEMENTATION OF ADDING DATA INSIDE TABLE */}
      {step === 2 && (
        <Box>
          <Autocomplete
            disableClearable
            getOptionLabel={(option) =>
              option.id && option.code ? `${option.code}` : ""
            }
            onChange={(event, newInputValue) => {
              handleSelectCodeFromDropdown(newInputValue);
            }}
            id="combo-box-demo"
            options={codeOptions}
            sx={{ width: 300, backgroundColor: "white" }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Add data in table" />
            )}
          />
          <TextField
            label="Write here"
            multiline
            rows={2}
            name="code"
            onKeyDown={(e) => handleEnterCode(e)}
            onChange={handleChange}
            value={codeInputs.code}
            type="text"
            variant="outlined"
          />
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "9fr 30fr",
              }}
            >
              <Typography variant="p">No</Typography>
              <Typography variant="p">Code</Typography>
            </Box>
            <Box
              sx={{
                border: "1px solid black",
                borderRadius: "0.5rem",
                padding: "0.2rem",
                height: "auto",
                paddingBottom: "2rem",
                width: "9rem",
              }}
            >
              {codesArr &&
                codesArr.map((a, index) => (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "9fr 30fr",
                    }}
                    key={a.id}
                    onDoubleClick={() => handleSelectCodeToEdit(a)}
                  >
                    <Typography variant="p">{index + 1}</Typography>
                    <Typography variant="p">{a.code}</Typography>
                    <p onClick={() => handleDeleteDataFromTable(a.id)}>
                      Delete
                    </p>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AutoComplete;
