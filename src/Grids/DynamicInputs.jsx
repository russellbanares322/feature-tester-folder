import { Autocomplete, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { testProfiles } from "../data/TestProfiles";
import LabTestForm from "./LabTestForm";

const DynamicInputs = () => {
  const [profileOptions] = useState(testProfiles);
  const [selectedLabTest, setSelectedLabTest] = useState(null);
  const [openFormModal, setOpenFormModal] = useState({
    fshTest: false,
    adeptonic: false,
  });

  const [testInputArr, setTestInputArr] = useState({
    fshTest: [],
    adeptonic: [],
  });

  const handleSelectProfile = (selectedTestProfile) => {
    const hasAdditionalInfo = selectedTestProfile.hasAdditionalInfo;
    if (hasAdditionalInfo) {
      if (
        testInputArr.fshTest.length === 0 &&
        selectedTestProfile.specimenType === "fsh"
      ) {
        setOpenFormModal((prev) => ({
          ...prev,
          fshTest: true,
        }));
        setSelectedLabTest(selectedTestProfile);
      }

      if (
        testInputArr.adeptonic.length === 0 &&
        selectedTestProfile.specimenType === "adeptonic"
      ) {
        setOpenFormModal((prev) => ({
          ...prev,
          adeptonic: true,
        }));
        setSelectedLabTest(selectedTestProfile);
      }
    } else {
      return;
    }
  };

  const handleCloseModal = () => {
    if (openFormModal.fshTest) {
      setOpenFormModal((prev) => ({
        ...prev,
        fshTest: false,
      }));
    }
    if (openFormModal.adeptonic) {
      setOpenFormModal((prev) => ({
        ...prev,
        adeptonic: false,
      }));
    }
    setSelectedLabTest(null);
  };
  return (
    <div>
      <pre>{JSON.stringify(testInputArr)}</pre>
      {JSON.stringify(openFormModal)}
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
        open={openFormModal.fshTest && testInputArr.fshTest.length === 0}
        onClose={handleCloseModal}
      >
        <LabTestForm
          testInputArr={testInputArr}
          setTestInputArr={setTestInputArr}
          selectedLabTest={selectedLabTest}
          setOpenFormModal={setOpenFormModal}
        />
      </Dialog>

      <Dialog
        open={openFormModal.adeptonic && testInputArr.adeptonic.length === 0}
        onClose={handleCloseModal}
      >
        <LabTestForm
          testInputArr={testInputArr}
          setTestInputArr={setTestInputArr}
          selectedLabTest={selectedLabTest}
          setOpenFormModal={setOpenFormModal}
        />
      </Dialog>
      <hr />
    </div>
  );
};

export default DynamicInputs;
