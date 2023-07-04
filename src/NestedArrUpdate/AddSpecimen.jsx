import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { Modal, Button, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeLabtestData } from "../slice/SavedLabTestSlice";
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
  const [specimenOptions, setSpecimenOptions] = useState([]);
  const [openSpecimenModal, setOpenSpecimenModal] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState([]);
  const [selectedTestDatas, setSelectedTestDatas] = useState(null);
  const savedLabtests = useSelector((state) => state.savedLabtests);
  const dispatch = useDispatch();

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
    const savedSpecimenNames = savedLabtests.savedSpecimensArr?.map(
      (data) => data.specimen
    );

    dispatch(
      handleChangeLabtestData({
        savedTestArr: [
          ...savedLabtests.savedTestArr,
          {
            type: selectedTestDatas?.type,
            id: selectedTestDatas?.id,
            name: selectedTestDatas?.name,
            specimen: selectedSpecimen,
            key: selectedSpecimen,
          },
        ],
      })
    );

    const filteredSelectedSpecimen = selectedSpecimen.filter(
      (val) => !savedSpecimenNames.includes(val)
    );
    dispatch(
      handleChangeLabtestData({
        savedSpecimensArr: [
          ...savedLabtests.savedSpecimensArr,
          ...filteredSelectedSpecimen.map((val) => ({
            key: val,
            specimen: val,
          })),
        ],
      })
    );
    setOpenSpecimenModal(false);
  };
  const handleAddTestAndSpecimenInArr = async (selectedTest) => {
    const savedTestNames = savedLabtests.savedTestArr?.map((test) => test.name);
    const isSelectedTestAlreadyAdded = savedTestNames.includes(
      selectedTest.name
    );
    const savedTestIds = savedLabtests.savedSelectedDatas.map(
      (data) => data.testId
    );
    const isSelectedTestCantBeAdded = savedTestIds.includes(selectedTest.id);

    if (isSelectedTestCantBeAdded) {
      notification.warning({
        message: "Failed to add test",
        description: `${selectedTest.name} is already inside in one of the added labtest`,
        placement: "bottomRight",
      });
    }

    if (!isSelectedTestAlreadyAdded && !isSelectedTestCantBeAdded) {
      await axios
        .get(`http://localhost:8000/labTest/${selectedTest.id}`)
        .then((response) => {
          setSelectedTestDatas(response?.data);
          const savedSpecimenNames = savedLabtests.savedSpecimensArr?.map(
            (data) => data.specimen
          );
          const selectedSpecimenFromApi = response?.data?.labTestSpecimens
            ?.map((data) => data.specimen.name)
            .toString()
            .replace(/,/g, " ");
          const isSpecimenCanBeAdded = !savedSpecimenNames.includes(
            selectedSpecimenFromApi
          );
          const isSpecimenPlenty = response?.data?.labTestSpecimens?.length > 1;
          const specimensToAdd = getSpecimenRecursively(response?.data);
          const testIdsToAdd = getTestIdRecursively(response?.data);

          if (isSpecimenPlenty && selectedTest.type === "Test") {
            setOpenSpecimenModal(true);
            setSpecimenOptions(
              response?.data?.labTestSpecimens?.map(
                (data) => data?.specimen?.name
              )
            );
          } else {
            const testToBeAdded = {
              type: response.data?.type,
              id: response.data?.id,
              name: response.data?.name,
              testIds:
                response.data?.child?.length > 0
                  ? testIdsToAdd.map((test) => test.testId)
                  : null,
              key:
                response.data?.child?.length > 0
                  ? [...new Set(specimensToAdd.map((data) => data.specimen))]
                  : [
                      response.data?.labTestSpecimens
                        ?.map((data) => data.specimen.name)
                        .toString()
                        .replace(/,/g, " "),
                    ],
              specimen:
                response.data?.child?.length > 0
                  ? [...new Set(specimensToAdd.map((data) => data.specimen))]
                  : [
                      response.data?.labTestSpecimens
                        ?.map((data) => data.specimen.name)
                        .toString()
                        .replace(/,/g, " "),
                    ],
            };

            dispatch(
              handleChangeLabtestData({
                savedTestArr: [...savedLabtests.savedTestArr, testToBeAdded],
              })
            );

            if (selectedTest.type !== "Test") {
              const childTestIds = testIdsToAdd.map((data) => data.testId);
              const filteredSavedTest = savedLabtests.savedTestArr?.filter(
                (data) => !childTestIds.includes(data.id)
              );
              dispatch(
                handleChangeLabtestData({
                  savedTestArr: [...filteredSavedTest, testToBeAdded],
                })
              );
            }
            if (response?.data?.child?.length > 0) {
              const filteredSpecimensToAdd = specimensToAdd.filter(
                (specimen) => {
                  return !savedLabtests.savedSpecimensArr.some((data) =>
                    specimen.specimen.includes(data.specimen)
                  );
                }
              );

              dispatch(
                handleChangeLabtestData({
                  savedSpecimensArr: [
                    ...savedLabtests.savedSpecimensArr,
                    ...filteredSpecimensToAdd.map((data) => ({
                      specimen: data.specimen,
                      key: data.specimen,
                    })),
                  ],
                })
              );

              const filteredTestIdsToAdd = testIdsToAdd.filter(
                (data) => !savedTestIds.includes(data.testId)
              );

              dispatch(
                handleChangeLabtestData({
                  savedSelectedDatas: [
                    ...savedLabtests.savedSelectedDatas,
                    ...filteredTestIdsToAdd.map((data) => ({
                      testId: data.testId,
                    })),
                  ],
                })
              );
            } else {
              if (isSpecimenCanBeAdded) {
                dispatch(
                  handleChangeLabtestData({
                    savedSpecimensArr: [
                      ...savedLabtests.savedSpecimensArr,
                      {
                        key: response.data?.labTestSpecimens
                          ?.map((data) => data.specimen.name)
                          .toString()
                          .replace(/,/g, " "),
                        specimen: response.data?.labTestSpecimens
                          ?.map((data) => data.specimen.name)
                          .toString()
                          .replace(/,/g, " "),
                      },
                    ],
                  })
                );
              }
              dispatch(
                handleChangeLabtestData({
                  savedSelectedDatas: [
                    ...savedLabtests.savedSelectedDatas,
                    { testId: response?.data?.id },
                  ],
                })
              );
            }
          }
        });
    }
  };

  const getSpecimenRecursively = (data, selectedSpecimens = {}) => {
    if (data?.labTestSpecimens) {
      data.labTestSpecimens?.map((specimenData) => {
        const specimenName = specimenData.specimen.name;
        selectedSpecimens[specimenName] = {
          specimen: specimenName,
        };
      });
    }

    if (data?.child && data.child.length > 0) {
      data.child.map((item) => {
        getSpecimenRecursively(item, selectedSpecimens);
      });
    }

    return Object.values(selectedSpecimens);
  };

  const getTestIdRecursively = (data) => {
    const selectedTestIds = [];

    data?.child?.map((item) => {
      if (item?.labTestSpecimens) {
        selectedTestIds.push({
          testId: item?.id,
        });
      }

      if (item?.child && item?.child?.length > 0) {
        const childSpecimens = getTestIdRecursively(item);
        selectedTestIds.push(...childSpecimens);
      }
    });

    return selectedTestIds;
  };

  const handleDeleteTestInArr = (selectedTest) => {
    const filteredSavedTestDatas = savedLabtests.savedSelectedDatas.filter(
      (data) => data.testId !== selectedTest.id
    );
    dispatch(
      handleChangeLabtestData({
        savedSelectedDatas: filteredSavedTestDatas,
      })
    );

    const filteredTest = savedLabtests.savedTestArr?.filter(
      (test) => test.id !== selectedTest.id
    );
    dispatch(
      handleChangeLabtestData({
        savedTestArr: filteredTest,
      })
    );

    const specimensToRemove = savedLabtests.savedSpecimensArr?.filter(
      (data) => {
        const isSpecimenPresentInOtherTests = savedLabtests.savedTestArr?.some(
          (test) =>
            test !== selectedTest && test.specimen.includes(data.specimen)
        );

        return !isSpecimenPresentInOtherTests;
      }
    );

    const filteredSpecimens = savedLabtests.savedSpecimensArr.filter(
      (data) =>
        !specimensToRemove.some(
          (specimen) => specimen.specimen === data.specimen
        )
    );

    dispatch(
      handleChangeLabtestData({
        savedSpecimensArr: filteredSpecimens,
      })
    );

    const filteredTestIds = savedSelectedDatas.filter(
      (data) => !selectedTest?.testIds.includes(data.testId)
    );
    dispatch(
      handleChangeLabtestData({
        savedSelectedDatas: filteredTestIds,
      })
    );
  };

  return (
    <div style={{ marginBottom: "6rem" }}>
      <h1>Add Specimen</h1>
      <h3>SAVED ID'S</h3>
      <pre>{JSON.stringify(savedLabtests.savedSelectedDatas, null, 4)}</pre>
      <h3>DATA THAT IS BEING SELECTED</h3>
      <pre>{JSON.stringify(savedLabtests.savedTestArr, null, 4)}</pre>
      <br />
      <h3>Saved Specimens</h3>
      <pre>{JSON.stringify(savedLabtests.savedSpecimensArr, null, 4)}</pre>
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
          {savedLabtests.savedTestArr?.map((test) => (
            <tr key={test.id}>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {test.name}
              </td>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {test.type === "Test" && test.specimen.join("/")}
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
          {savedLabtests.savedSpecimensArr?.map((data) => (
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
      <Button type="primary">Submit Order</Button>
    </div>
  );
};

export default AddSpecimen;
