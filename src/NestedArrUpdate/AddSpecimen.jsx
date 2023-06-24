import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

export const TestOptions = [
  {
    id: 555,
    type: "Package",
    name: "First Package",
    child: [
      {
        id: 888,
        type: "Test",
        name: "First Test",
        testDetails: {
          specimen: "Serum",
          volumeRequirement: "2.0mL",
        },
        child: [],
      },
      {
        id: 999,
        type: "Profile",
        name: "First Profile",
        child: [
          {
            id: 141,
            type: "Test",
            name: "Second Test",
            testDetails: {
              specimen: "Whole blood",
              volumeRequirement: "1mL",
            },
          },
        ],
      },
    ],
  },
  {
    id: 551,
    type: "Test",
    name: "Third Test",
    testDetails: {
      specimen: "Slide",
      volumeRequirement: "3mL",
    },
    child: [],
  },
  {
    id: 557,
    type: "Test",
    name: "Fourth Test",
    testDetails: {
      specimen: "Serum",
      volumeRequirement: "10mL",
    },
    child: [],
  },
  {
    id: 989,
    type: "Test",
    name: "Fifth Test",
    testDetails: {
      specimen: "Serum",
      volumeRequirement: "50mL",
    },
    child: [],
  },
];

const AddSpecimen = () => {
  const [savedTestArr, setSavedTestArr] = useState([]);
  const [savedSpecimensArr, setSavedSpecimensArr] = useState([]);

  const handleAddTestAndSpecimenInArr = (selectedTest) => {
    const savedTestNames = savedTestArr?.map((test) => test.name);
    const isSelectedTestAlreadyAdded = savedTestNames.includes(
      selectedTest.name
    );
    const specimensToAdd = getSpecimenRecursively(selectedTest);

    if (!isSelectedTestAlreadyAdded) {
      setSavedTestArr([
        ...savedTestArr,
        {
          id: selectedTest.id,
          name: selectedTest.name,
        },
      ]);

      specimensToAdd.map((specimen) => {
        if (
          !savedSpecimensArr.find((data) => data.specimen === specimen.specimen)
        ) {
          setSavedSpecimensArr((prevArr) => [...prevArr, specimen]);
        }
      });
    }
  };

  const getSpecimenRecursively = (data) => {
    let selectedSpecimens = [];

    data.child?.map((item) => {
      if (item?.testDetails) {
        selectedSpecimens.push({
          specimen: item?.testDetails.specimen,
          volumeRequirement: item?.testDetails.volumeRequirement,
        });
      }
      if (item?.child && item?.child.length > 0) {
        const childSpecimens = getSpecimenRecursively(item);
        selectedSpecimens.push(...childSpecimens);
      }
    });
    return selectedSpecimens;
  };

  return (
    <div style={{ marginBottom: "6rem" }}>
      <h1>Add Specimen</h1>
      <pre>{JSON.stringify(savedSpecimensArr, null, 4)}</pre>
      <br />
      <Autocomplete
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => {
          handleAddTestAndSpecimenInArr(value);
        }}
        options={TestOptions}
        renderInput={(params) => (
          <TextField {...params} placeholder="Add test in table" />
        )}
        disableClearable
      />
      <br />
      <h1>TEST ARR</h1>
      <table>
        <thead>
          <th>Test Name</th>
        </thead>
        <tbody>
          {savedTestArr?.map((test) => (
            <tr key={test.id}>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {test.name}
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
