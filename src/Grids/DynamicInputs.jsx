import { Autocomplete, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { testProfiles } from "../data/TestProfiles";
import LabTestForm from "./LabTestForm";

const DynamicInputs = () => {
  const [profileOptions] = useState(testProfiles);
  const [selectedLabTest, setSelectedLabTest] = useState(null);
  const [openFormModal, setOpenFormModal] = useState(false);

  const handleSelectProfile = (selectedTestProfile) => {
    const hasAdditionalInfo = selectedTestProfile.hasAdditionalInfo;
    if (hasAdditionalInfo) {
      setOpenFormModal(true);
      setSelectedLabTest(selectedTestProfile);
    } else {
      return;
    }
  };

  const handleCloseModal = () => {
    setOpenFormModal(false);
    setSelectedLabTest(null);
  };
  return (
    <div>
      <h1>Dynamic Inputs</h1>
      <Autocomplete
        disableClearable
        getOptionLabel={(option) => option.displayName}
        onChange={(event, newInputValue) => {
          handleSelectProfile(newInputValue);
        }}
        id="combo-box-demo"
        options={profileOptions}
        sx={{ width: 300, backgroundColor: "white" }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Please select test profile" />
        )}
      />

      <Dialog
        open={openFormModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <LabTestForm selectedLabTest={selectedLabTest} />
      </Dialog>
      <hr />
    </div>
  );
};

export default DynamicInputs;
