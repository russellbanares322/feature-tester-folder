import React, { useState, useRef } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Dboard from "./Dboard";
const codes = [
  { id: 1, code: "testing A" },
  { id: 2, code: "testing B" },
  { id: 3, code: "testing C" },
  { id: 4, code: "testing D" },
];

const AutoComplete = () => {
  const [step, setStep] = useState(1);
  const [codeOptions, setCodeOptions] = useState(codes);
  const codesRef = useRef();

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prevStep) => Math.min(2, prevStep + 1));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };
  const [movieYear, setMovieYear] = useState(null);
  const [codeInputs, setCodeInputs] = useState({
    id: Math.random(),
    code: "",
  });
  const [codesArr, setCodesArr] = useState([]);
  const [selectedCodeId, setSelectedCodeId] = useState(null);
  const handleSelectCode = (selectedCode) => {
    setCodesArr([...codesArr, selectedCode]);
  };

  console.log(selectedCodeId);
  const handleEnterCode = (e) => {
    if (e.key === "Enter" && selectedCodeId === null) {
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
      codesRef.current.value.reset();
      setCodeInputs({
        code: "",
      });
    }
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
      {JSON.stringify(codesArr)}

      {/* IMPLEMENTATION OF ADDING DATA INSIDE TABLE */}
      {step === 2 && (
        <Box>
          <h1 color="white">{movieYear}</h1>
          <Autocomplete
            disableClearable
            getOptionLabel={(option) =>
              option.id && option.code ? `${option.code}` : ""
            }
            onChange={(event, newInputValue) => {
              handleSelectCode(newInputValue);
            }}
            id="combo-box-demo"
            options={codeOptions}
            sx={{ width: 300, backgroundColor: "white" }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Province" />
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
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      )}
      {step === 1 && (
        <Box>
          {JSON.stringify(codeOptions)}
          <Autocomplete
            getOptionLabel={(option) =>
              option.id && option.code ? `${option.code}` : ""
            }
            onChange={(event, newInputValue) => {
              handleSelectCode(newInputValue);
            }}
            ref={codesRef}
            id="combo-box-demo"
            options={codeOptions}
            sx={{ width: 300, backgroundColor: "white" }}
            onKeyDown={(e) => handleAddCodeInDropdown(e)}
            renderInput={(params) => (
              <TextField
                ref={codesRef}
                value={codeInputs.code}
                onKeyDown={(e) => handleAddCodeInDropdown(e)}
                onChange={(e) => setCodeInputs({ code: e.target.value })}
                {...params}
                placeholder="New Code"
              />
            )}
          />
        </Box>
      )}
    </div>
  );
};

export default AutoComplete;
