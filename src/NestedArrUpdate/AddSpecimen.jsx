import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export const labTestLookup = [
  {
    id: 555,
    type: "Package",
    name: "First Package",
    specimen: null,
    volumeRequirement: null,
  },
  {
    id: 551,
    type: "Test",
    name: "Third Test",
    specimen: "Slide",
    volumeRequirement: "3mL",
  },
  {
    id: 557,
    type: "Test",
    name: "Fourth Test",
    specimen: "Serum",
    volumeRequirement: "10mL",
  },
  {
    id: 989,
    type: "Test",
    name: "Fifth Test",
    specimen: "Serum",
    volumeRequirement: "50mL",
  },
];

const AddSpecimen = () => {
  const [savedTestArr, setSavedTestArr] = useState([]);
  const [savedSpecimensArr, setSavedSpecimensArr] = useState([]);

  const handleAddTestAndSpecimenInArr = async (selectedTest) => {
    const savedTestNames = savedTestArr?.map((test) => test.name);
    const isSelectedTestAlreadyAdded = savedTestNames.includes(
      selectedTest.name
    );
    const isSpecimenNotNull = selectedTest.specimen !== null;
    const isVolumeRequirementNotNull = selectedTest.volumeRequirement !== null;
    const isSpecimenCanBeAdded = !savedSpecimensArr.find(
      (data) => data.specimen === selectedTest?.specimen
    );

    if (!isSelectedTestAlreadyAdded) {
      await axios
        .get(`http://localhost:8000/labTest/${selectedTest.id}`)
        .then((response) => {
          const specimensToAdd = getSpecimenRecursively(response.data);
          setSavedTestArr([
            ...savedTestArr,
            {
              id: response.data?.id,
              name: response.data?.name,
              specimen:
                response.data?.child?.length > 0
                  ? specimensToAdd.map((data) => data.specimen)
                  : [response.data?.testDetails?.specimen],
            },
          ]);

          specimensToAdd.map((specimen) => {
            if (
              !savedSpecimensArr.find(
                (data) => data.specimen === specimen.specimen
              )
            ) {
              setSavedSpecimensArr((prevArr) => [...prevArr, specimen]);
            }
          });
        });

      if (
        isSpecimenNotNull &&
        isVolumeRequirementNotNull &&
        isSpecimenCanBeAdded
      ) {
        setSavedSpecimensArr([
          ...savedSpecimensArr,
          {
            specimen: selectedTest.specimen,
            volumeRequirement: selectedTest.volumeRequirement,
          },
        ]);
      }
    }
  };

  const getSpecimenRecursively = (data) => {
    let selectedSpecimens = [];

    data.child?.map((item) => {
      if (item?.testDetails) {
        selectedSpecimens.push({
          specimen: item?.testDetails?.specimen,
          volumeRequirement: item?.testDetails?.volumeRequirement,
        });
      }
      if (item?.child && item?.child.length > 0) {
        const childSpecimens = getSpecimenRecursively(item);
        selectedSpecimens.push(...childSpecimens);
      }
    });
    return selectedSpecimens;
  };

  const handleDeleteTestInArr = (selectedTest) => {
    const isSpecimenAllowedToDelete = savedTestArr.some((test) =>
      test.specimen.includes(selectedTest.specimen)
    );

    const filteredTest = savedTestArr.filter(
      (test) => test.id !== selectedTest.id
    );
    setSavedTestArr(filteredTest);

    if (!isSpecimenAllowedToDelete) {
      const filteredSpecimen = savedSpecimensArr.filter(
        (data) => !selectedTest.specimen.includes(data.specimen)
      );
      setSavedSpecimensArr(filteredSpecimen);
    }
  };

  return (
    <div style={{ marginBottom: "6rem" }}>
      <h1>Add Specimen</h1>
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
          <th>Action</th>
        </thead>
        <tbody>
          {savedTestArr?.map((test) => (
            <tr key={test.id}>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {test.name}
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
          <th>Volume Requirement</th>
        </thead>
        <tbody>
          {savedSpecimensArr?.map((data) => (
            <tr key={data}>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {data.specimen}
              </td>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {data.volumeRequirement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddSpecimen;
