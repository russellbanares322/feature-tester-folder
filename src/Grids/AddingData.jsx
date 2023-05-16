import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import React, { useState } from "react";

const codeData = [
  {
    id: 1,
    displayName: "1001 - OneTest Abc",
  },
  {
    id: 2,
    displayName: "1002 - TwoTest Xbc",
  },
  {
    id: 3,
    displayName: "1003 - ThreeTest Ybc",
  },
  {
    id: 4,
    displayName: "1004 - FourTest Zbc",
  },
];
const filter = createFilterOptions();

const AddingData = () => {
  const [codeOptions, setCodeOptions] = useState(codeData);
  const [inputs, setInputs] = useState({
    displayName: "",
  });
  const [addedCode, setAddedCode] = useState([]);

  const handleAddCodeInArr = (selectedCode) => {
    setAddedCode([...addedCode, selectedCode]);
  };

  const handleAddInputInArr = () => {
    setAddedCode([
      ...addedCode,
      { id: Math.random(), displayName: inputs.displayName },
    ]);
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {JSON.stringify(addedCode)}
      <Autocomplete
        disableClearable
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            handleAddInputInArr();
          } else if (newValue && newValue.inputValue) {
            handleAddCodeInArr(newValue);
          } else {
            handleAddInputInArr();
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;

          const isExisting = options.some(
            (option) => inputValue === option.displayName
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              displayName: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        options={codeOptions}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.displayName;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>{option.displayName}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            name="displayName"
            value={inputs.displayName}
            onChange={handleChange}
            {...params}
          />
        )}
      />
    </div>
  );
};

export default AddingData;
