import {
  Autocomplete,
  TextField,
  createFilterOptions,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import AddingData from "./AddingData";

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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "green",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Creatable = () => {
  const [codeOptions, setCodeOptions] = useState(codeData);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(null);

  const [addedCode, setAddedCode] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddCodeInArr = (selectedCode) => {
    setAddedCode([...addedCode, selectedCode]);
  };
  return (
    <div>
      <AddingData />
      <Autocomplete
        disableClearable
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              handleOpenModal(true);
            });
          } else if (newValue && newValue.inputValue) {
            handleOpenModal(true);
          } else {
            setValue(newValue);
            handleAddCodeInArr(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              displayName: "Add new patient",
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
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
        renderInput={(params) => <TextField {...params} />}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Creatable;
