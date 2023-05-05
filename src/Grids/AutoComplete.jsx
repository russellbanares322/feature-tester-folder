import React, { useState } from "react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
const top100Films = [
  { code: "testing A" },
  { code: "testing B" },
  { code: "testing C" },
  { code: "testing D" },
];

const AutoComplete = () => {
  const [movieYear, setMovieYear] = useState(null);
  const [codeInputs, setCodeInputs] = useState({
    code: "",
  });
  const [codesArr, setCodesArr] = useState([]);
  const [selectedCodeId, setSelectedCodeId] = useState(null);
  const handleSelectCode = (selectedCode) => {
    setCodesArr([...codesArr, selectedCode]);
  };

  const handleEnterCode = (e) => {
    if (e.key === "Enter") {
      setCodesArr([...codesArr, codeInputs]);
      setCodeInputs({
        code: "",
      });
    }
  };

  const handleSelectCodeToEdit = (selectedCode, selectedCodeIdx) => {
    if (!top100Films.includes(selectedCode)) setCodeInputs({ ...selectedCode });
    setSelectedCodeId(selectedCodeIdx);
  };

  const handleSave = () => {
    setCodesArr((prevCodesArr) =>
      prevCodesArr.map((c, idx) =>
        idx === selectedCodeId ? { ...c, ...codeInputs } : c
      )
    );

    setSelectedCodeId(null);
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
      <h1 color="white">{movieYear}</h1>
      <Autocomplete
        disableClearable
        getOptionLabel={(option) => (option.code ? `${option.code}` : "")}
        onChange={(event, newInputValue) => {
          handleSelectCode(newInputValue);
        }}
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, backgroundColor: "white" }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Province" />
        )}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Write here"
        multiline
        maxRows={5}
        value={codeInputs.code}
        onKeyDown={(e) =>
          selectedCodeId === null ? handleEnterCode(e) : handleSave()
        }
        onChange={(e) => setCodeInputs({ code: e.target.value })}
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
                key={a.no}
                onDoubleClick={() => handleSelectCodeToEdit(a, index)}
              >
                <Typography variant="p">{index + 1}</Typography>
                <Typography variant="p">{a.code}</Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </div>
  );
};

export default AutoComplete;
