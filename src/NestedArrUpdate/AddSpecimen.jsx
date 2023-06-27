import { Autocomplete, TextField } from "@mui/material";
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
  {
    id: 100,
    type: "Test",
    name: "Xyz Test",
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

    if (!isSelectedTestAlreadyAdded) {
      await axios
        .get(`http://localhost:8000/labTest/${selectedTest.id}`)
        .then((response) => {
          const specimenNamesSaved = savedSpecimensArr.map(
            (data) => data.specimen
          );
          const selectedSpecimen = response?.data?.labTestSpecimens
            ?.map((data) => data.specimen.name)
            .toString()
            .replace(/,/g, " ");
          const isSpecimenCanBeAdded =
            !specimenNamesSaved.includes(selectedSpecimen);
          const isSpecimenNotNull = response.data?.labTestSpecimens?.length > 0;
          const specimensToAdd = getSpecimenRecursively(response?.data);
          setSavedTestArr([
            ...savedTestArr,
            {
              id: response.data?.id,
              name: response.data?.name,
              specimen:
                response.data?.child?.length > 0
                  ? specimensToAdd
                      .map((data) => data.specimen)
                      .toString()
                      .replace(/,/g, " ")
                  : response.data?.labTestSpecimens
                      ?.map((data) => data.specimen.name)
                      .toString()
                      .replace(/,/g, " "),
            },
          ]);

          specimensToAdd.map((specimen) => {
            if (
              !savedSpecimensArr.find((data) =>
                specimen.specimen.includes(data.specimen)
              )
            ) {
              setSavedSpecimensArr((prevArr) => [...prevArr, specimen]);
            }
          });
          if (isSpecimenNotNull && isSpecimenCanBeAdded) {
            setSavedSpecimensArr([
              ...savedSpecimensArr,
              {
                specimen:
                  response.data?.child?.length > 0
                    ? specimensToAdd
                    : response.data?.labTestSpecimens
                        ?.map((data) => data.specimen.name)
                        .toString()
                        .replace(/,/g, " "),
              },
            ]);
          }
        });
    }
  };

  const getSpecimenRecursively = (data) => {
    let selectedSpecimens = [];

    data.child?.map((item) => {
      if (item?.labTestSpecimens) {
        selectedSpecimens.push({
          specimen: item?.labTestSpecimens
            .map((data) => data.specimen.name)
            .toString()
            .replace(/,/g, " "),
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
    </div>
  );
};

export default AddSpecimen;
