import { Autocomplete, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { testProfiles } from "../data/TestProfiles";
import LabTestForm from "./LabTestForm";

const DynamicInputs = () => {
  const [profileOptions] = useState(testProfiles);
  const [selectedLabTest, setSelectedLabTest] = useState(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [testInputArr, setTestInputArr] = useState({
    fshTest: [],
    adeptonic: [],
  });

  const handleSelectProfile = (selectedTestProfile) => {
    const hasAdditionalInfo = selectedTestProfile.hasAdditionalInfo;
    if (hasAdditionalInfo) {
      if (
        testInputArr.fshTest.length === 0 ||
        testInputArr.adeptonic.length === 0
      ) {
        setOpenFormModal(true);
        setSelectedLabTest(selectedTestProfile);
      } else {
        return;
      }
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
      <pre>{JSON.stringify(testInputArr)}</pre>
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
        <LabTestForm
          testInputArr={testInputArr}
          setTestInputArr={setTestInputArr}
          selectedLabTest={selectedLabTest}
        />
      </Dialog>
      <hr />
    </div>
  );
};

export default DynamicInputs;
