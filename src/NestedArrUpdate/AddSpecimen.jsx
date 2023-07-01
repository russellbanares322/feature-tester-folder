import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

export const labTestLookup = [
  {
    id: 555,
    type: "Package",
    name: "First Package",
  },
  {
    id: 888,
    type: "Test",
    name: "First Test",
  },
  {
    id: 187,
    type: "Test",
    name: "Inside Test",
  },
  {
    id: 551,
    type: "Test",
    name: "Third Test",
  },
  {
    id: 141,
    type: "Test",
    name: "Second Test",
  },
  {
    id: 557,
    type: "Test",
    name: "Fourth Test",
  },
  {
    id: 100,
    type: "Test",
    name: "Xyz Test",
  },
  {
    id: 870,
    type: "Test",
    name: "Abc Test",
  },
];

const AddSpecimen = () => {
  const [savedTestArr, setSavedTestArr] = useState([]);
  const [savedSpecimensArr, setSavedSpecimensArr] = useState([]);
  const [specimenOptions, setSpecimenOptions] = useState([]);
  const [openSpecimenModal, setOpenSpecimenModal] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState([]);
  const [savedSelectedDatas, setSavedSelectedDatas] = useState([]);
  const [selectedTestDatas, setSelectedTestDatas] = useState(null);

  const handleSelectSpecimen = (e) => {
    const { value } = e.target;
    const index = selectedSpecimen.indexOf(value);

    if (index === -1) {
      setSelectedSpecimen([...selectedSpecimen, value]);
    } else {
      setSelectedSpecimen(selectedSpecimen.filter((val) => val !== value));
    }
  };

  const handleSubmitSpecimen = () => {
    const specimenNamesSaved = savedSpecimensArr.map((data) => data.specimen);
    const isSpecimenCanBeAdded = !specimenNamesSaved.includes(
      selectedSpecimen.map((val) => val)
    );

    setSavedTestArr([
      ...savedTestArr,
      {
        id: selectedTestDatas?.id,
        name: selectedTestDatas?.name,
        specimen: selectedSpecimen,
      },
    ]);

    if (isSpecimenCanBeAdded) {
      selectedSpecimen.map((val) =>
        setSavedSpecimensArr((prevArr) => [...prevArr, { specimen: val }])
      );
    }
    setOpenSpecimenModal(false);
  };
  const handleAddTestAndSpecimenInArr = async (selectedTest) => {
    const savedTestNames = savedTestArr?.map((test) => test.name);
    const isSelectedTestAlreadyAdded = savedTestNames.includes(
      selectedTest.name
    );
    const savedTestIds = savedSelectedDatas.map((data) => data.id);
    const isSelectedTestCantBeAdded = savedTestIds.includes(selectedTest.id);

    if (isSelectedTestCantBeAdded) {
      return alert(
        `${selectedTest?.name} can't be added, because the test is already inside the package`
      );
    }

    if (!isSelectedTestAlreadyAdded && !isSelectedTestCantBeAdded) {
      await axios
        .get(`http://localhost:8000/labTest/${selectedTest.id}`)
        .then((response) => {
          setSelectedTestDatas(response?.data);
          const specimenNamesSaved = savedSpecimensArr.map(
            (data) => data.specimen
          );
          const selectedSpecimenFromApi = response?.data?.labTestSpecimens
            ?.map((data) => data.specimen.name)
            .toString()
            .replace(/,/g, " ");
          const isSpecimenCanBeAdded = !specimenNamesSaved.includes(
            selectedSpecimenFromApi
          );
          const isSpecimenPlenty = response?.data?.labTestSpecimens?.length > 1;
          const specimensToAdd = getSpecimenRecursively(response?.data);

          if (isSpecimenPlenty && selectedTest.type === "Test") {
            setOpenSpecimenModal(true);
            setSpecimenOptions(
              response?.data?.labTestSpecimens?.map(
                (data) => data?.specimen?.name
              )
            );
          } else {
            //If the type of specimen is an array then dont display that to the UI
            const testToBeAdded = {
              id: response.data?.id,
              name: response.data?.name,
              specimen:
                response.data?.child?.length > 0
                  ? [...new Set(specimensToAdd.map((data) => data.specimen))]
                  : response.data?.labTestSpecimens
                      ?.map((data) => data.specimen.name)
                      .toString()
                      .replace(/,/g, " "),
            };

            setSavedTestArr([...savedTestArr, testToBeAdded]);

            if (selectedTest.type !== "Test") {
              const savedTestIds = savedSelectedDatas.map(
                (test) => test.testId
              );
              setTimeout(() => {
                setSavedTestArr((prevSavedTest) =>
                  prevSavedTest.map((test) =>
                    savedTestIds.includes(test.id)
                      ? { ...test, ...testToBeAdded }
                      : test
                  )
                );
              }, 500);
            }
            if (response?.data?.child?.length > 0) {
              specimensToAdd.map((specimen) => {
                if (
                  !savedSpecimensArr.find((data) =>
                    specimen.specimen.includes(data.specimen)
                  )
                ) {
                  setSavedSpecimensArr((prevArr) => [
                    ...prevArr,
                    { specimen: specimen.specimen },
                  ]);
                  setSavedSelectedDatas((prevDatas) => [
                    ...prevDatas,
                    { testId: specimen.testId },
                  ]);
                }
              });
            } else {
              if (isSpecimenCanBeAdded) {
                setSavedSpecimensArr([
                  ...savedSpecimensArr,
                  {
                    specimen: response.data?.labTestSpecimens
                      ?.map((data) => data.specimen.name)
                      .toString()
                      .replace(/,/g, " "),
                  },
                ]);
              }
              setSavedSelectedDatas([
                ...savedSelectedDatas,
                { testId: response?.data?.id },
              ]);
            }
          }
        });
    }
  };

  const getSpecimenRecursively = (data) => {
    const selectedSpecimens = {};

    data?.child?.map((item) => {
      if (item?.labTestSpecimens) {
        item?.labTestSpecimens.map((specimenData) => {
          const specimenName = specimenData.specimen.name;
          selectedSpecimens[specimenName] = {
            testId: item.id,
            specimen: specimenName,
          };
        });
      }

      if (item?.child && item.child.length > 0) {
        const childSpecimens = getSpecimenRecursively(item);
        Object.entries(childSpecimens).map(([specimenName, specimenData]) => {
          if (!selectedSpecimens[specimenName]) {
            selectedSpecimens[specimenName] = specimenData;
          }
        });
      }
    });

    return Object.values(selectedSpecimens);
  };

  const handleDeleteTestInArr = (selectedTest) => {
    const filteredSavedTest = savedSelectedDatas.filter(
      (data) => data.testId !== selectedTest.id
    );
    setSavedSelectedDatas(filteredSavedTest);
    const filteredTest = savedTestArr.filter(
      (test) => test.id !== selectedTest.id
    );
    setSavedTestArr(filteredTest);

    const specimensToRemove = savedSpecimensArr.filter((data) => {
      const isSpecimenPresentInOtherTests = savedTestArr.some(
        (test) => test !== selectedTest && test.specimen.includes(data.specimen)
      );

      return !isSpecimenPresentInOtherTests;
    });

    const filteredSpecimens = savedSpecimensArr.filter(
      (data) =>
        !specimensToRemove.some(
          (specimen) => specimen.specimen === data.specimen
        )
    );
    setSavedSpecimensArr(filteredSpecimens);
  };

  return (
    <div style={{ marginBottom: "6rem" }}>
      <h1>Add Specimen</h1>
      <h3>SAVED ID'S</h3>
      <pre>{JSON.stringify(savedSelectedDatas, null, 4)}</pre>
      <h3>DATA THAT IS BEING SELECTED</h3>
      <pre>{JSON.stringify(savedTestArr, null, 4)}</pre>
      <br />
      <h3>Saved Specimens</h3>
      <pre>{JSON.stringify(savedSpecimensArr, null, 4)}</pre>
      <br />
      <Autocomplete
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => {
          handleAddTestAndSpecimenInArr(value);
        }}
        options={labTestLookup}
        renderInput={(params) => (
          <TextField {...params} placeholder="Add test in table" />
        )}
        disableClearable
      />
      <br />
      <h1>TEST ARR</h1>
      <table>
        <thead>
          <th style={{ borderRight: "1px solid red" }}>Test Name</th>
          <th style={{ borderRight: "1px solid red" }}>Specimen</th>
          <th>Action</th>
        </thead>
        <tbody>
          {savedTestArr?.map((test) => (
            <tr key={test.id}>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {test.name}
              </td>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {typeof test.specimen === "string" && test.specimen}
              </td>
              <td
                onClick={() => handleDeleteTestInArr(test)}
                style={{ color: "red", cursor: "pointer" }}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h1>SPECIMENS ARR</h1>
      <table>
        <thead>
          <th style={{ borderRight: "1px solid red" }}>Specimen Name</th>
        </thead>
        <tbody>
          {savedSpecimensArr?.map((data) => (
            <tr key={data}>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {data.specimen}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title={`Please select one specimen for ${selectedTestDatas?.name}`}
        open={openSpecimenModal}
        onCancel={() => setOpenSpecimenModal(false)}
        onOk={handleSubmitSpecimen}
      >
        {specimenOptions?.map((value) => (
          <FormControl key={value}>
            <FormGroup>
              <FormControlLabel
                value={value}
                control={
                  <Checkbox
                    value={value}
                    checked={selectedSpecimen.includes(value)}
                    onChange={handleSelectSpecimen}
                  />
                }
                label={value}
              />
            </FormGroup>
          </FormControl>
        ))}
      </Modal>
    </div>
  );
};

export default AddSpecimen;
