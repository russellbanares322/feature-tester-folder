import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { Modal, Button, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
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

export const inputTypeOptions = ["text", "number", "date"];

const AddSpecimen = () => {
  const [specimenOptions, setSpecimenOptions] = useState([]);
  const [openSpecimenModal, setOpenSpecimenModal] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState([]);
  const [selectedTestDatas, setSelectedTestDatas] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [selectedLabtestRequirements, setSelectedLabtestRequirements] =
    useState([]);
  const [showLabReqModal, setShowLabReqModal] = useState(false);
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
    const savedSpecimenNames = savedLabtests?.savedSpecimensArr?.map(
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
    const parentLabtestName = savedLabtests?.savedTestArr?.filter((test) =>
      test?.testIds?.includes(selectedTest.id)
    );

    if (isSelectedTestCantBeAdded) {
      notification.warning({
        message: "Failed to add test",
        description: (
          <>
            <strong> {selectedTest.name}</strong> is already inside of{" "}
            <strong>
              {parentLabtestName.map((test) => test.name).join(", ")}
            </strong>
          </>
        ),
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
          const selectedSpecimenFromApi =
            response?.data?.testDetails?.labTestSpecimens
              ?.map((data) => data.specimen.name)
              .toString()
              .replace(/,/g, " ");
          const specimenNamesInsideSpecimenCount =
            savedLabtests?.specimenCount?.map((data) => data.specimenName);
          const specimenWillIncrease =
            specimenNamesInsideSpecimenCount?.includes(selectedSpecimenFromApi);
          const isSpecimenCanBeAdded = !savedSpecimenNames.includes(
            selectedSpecimenFromApi
          );
          const isSpecimenPlenty =
            response?.data?.testDetails?.labTestSpecimens?.length > 1;
          const specimensToAdd = getSpecimenRecursively(response?.data);
          const testIdsToAdd = getTestIdRecursively(response?.data);
          const recursiveSpecimenCount = getSpecimenCountRecursively(
            response?.data
          );
          // const childLabTestRequirements = getLabtestRequirementsRecursively(
          //   response?.data
          // );

          if (selectedTest.type === "Test") {
            if (specimenWillIncrease && !isSpecimenPlenty) {
              dispatch(
                handleChangeLabtestData({
                  specimenCount: savedLabtests.specimenCount.map((data) =>
                    data.specimenName === selectedSpecimenFromApi
                      ? {
                          ...data,
                          quantity: data.quantity + 1,
                        }
                      : data
                  ),
                })
              );
            } else {
              dispatch(
                handleChangeLabtestData({
                  specimenCount: [
                    ...savedLabtests.specimenCount,
                    { specimenName: selectedSpecimenFromApi, quantity: 1 },
                  ],
                })
              );
            }
          }

          // if (
          //   isSpecimenPlenty &&
          //   selectedTest.type === "Test" &&
          //   childLabTestRequirements.length === 0
          // ) {
          //   setOpenSpecimenModal(true);
          //   setSpecimenOptions(
          //     response?.data?.testDetails?.labTestSpecimens?.map(
          //       (data) => data?.specimen?.name
          //     )
          //   );
          // } else if (
          //   childLabTestRequirements.length > 0 &&
          //   response?.data?.child.length > 0 &&
          //   selectedTest.type !== "Test"
          // ) {
          //   setShowLabReqModal(true);
          //   childLabTestRequirements.map((test) => {
          //     setSelectedLabtestRequirements((prevLabtestReq) => [
          //       ...prevLabtestReq,
          //       {
          //         id: test.id,
          //         requirementType: test.requirementType,
          //         isRequired: test.isRequired,
          //         requirementDetails: test.requirementDetails,
          //       },
          //     ]);
          //   });
          // } else {
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
                    response.data?.testDetails?.labTestSpecimens
                      ?.map((data) => data.specimen.name)
                      .toString()
                      .replace(/,/g, " "),
                  ],
            specimen:
              response.data?.child?.length > 0
                ? [...new Set(specimensToAdd.map((data) => data.specimen))]
                : [
                    response.data?.testDetails?.labTestSpecimens
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
            const testToBeRemoved = savedLabtests.savedTestArr.filter((data) =>
              childTestIds.includes(data.id)
            );

            dispatch(
              handleChangeLabtestData({
                savedTestArr: [...filteredSavedTest, testToBeAdded],
              })
            );

            dispatch(
              handleChangeLabtestData({
                specimenCount: [
                  ...savedLabtests.specimenCount,
                  ...recursiveSpecimenCount.map((data) =>
                    specimenNamesInsideSpecimenCount.includes(data.specimenName)
                      ? {
                          ...data,
                          quantity:
                            data.quantity +
                            recursiveSpecimenCount.filter((data) =>
                              data.specimenName.includes(
                                specimenNamesInsideSpecimenCount
                              )
                            ).length,
                        }
                      : {
                          specimenName: data.specimenName,
                          quantity: 1,
                        }
                  ),
                ],
              })
            );
            if (testToBeRemoved.length > 0) {
              notification.warning({
                message: "Failed to add test",
                description: (
                  <>
                    <strong>
                      {" "}
                      {testToBeRemoved.map((test) => test.name).join(", ")}
                    </strong>{" "}
                    {testToBeRemoved.length > 1 ? "are" : "is"} removed because
                    it is inside of <strong>{response?.data?.name}</strong>
                  </>
                ),
                placement: "bottomRight",
              });
            }
            // }
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
                      key: data.key,
                      specimenQuantity: data.specimenQuantity,
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
                        key: response.data?.testDetails?.labTestSpecimens
                          ?.map((data) => data.specimen.name)
                          .toString()
                          .replace(/,/g, " "),
                        specimen: response.data?.testDetails?.labTestSpecimens
                          ?.map((data) => data.specimen.name)
                          .toString()
                          .replace(/,/g, " "),
                        specimenQuantity:
                          response?.data?.testDetails?.labTestSpecimens.map(
                            (data) => data.testVolumeOrSizeRequirements
                          )[0],
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
    if (data?.testDetails?.labTestSpecimens) {
      data?.testDetails?.labTestSpecimens?.map((specimenData) => {
        const specimenName = specimenData.specimen.name;
        selectedSpecimens[specimenName] = {
          specimen: specimenName,
          key: specimenName,
          specimenQuantity: data?.testDetails?.labTestSpecimens.map(
            (specimen) => specimen.testVolumeOrSizeRequirements
          )[0],
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
      if (item?.testDetails?.labTestSpecimens) {
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

  const getSpecimenCountRecursively = (data) => {
    const specimenNamesCount = [];

    data?.child?.map((item) => {
      if (item?.testDetails?.labTestSpecimens) {
        item?.testDetails?.labTestSpecimens.map((data) =>
          specimenNamesCount.push({
            specimenName: data?.specimen?.name,
          })
        );
      }

      if (item?.child && item?.child?.length > 0) {
        const childSpecimens = getSpecimenCountRecursively(item);
        specimenNamesCount.push(...childSpecimens);
      }
    });

    return specimenNamesCount;
  };

  const getLabtestRequirementsRecursively = (data) => {
    let labTestRequirementsData = [];

    data?.child?.map((item) => {
      if (item?.testDetails?.labTestRequirements) {
        item?.testDetails?.labTestRequirements.map((test) => {
          labTestRequirementsData.push({
            id: test.id,
            requirementType: test.requirementType,
            isRequired: test.isRequired,
            requirementDetails: test.requirementDetails,
          });
        });
      }

      if (item?.child && item?.child?.length > 0) {
        const childLabTestRequirements =
          getLabtestRequirementsRecursively(item);
        labTestRequirementsData.push(...childLabTestRequirements);
      }
    });

    return labTestRequirementsData;
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

  const handleCloseLabReqModal = () => {
    setShowLabReqModal(false);
  };

  const handleInputChange = (e, inputId) => {
    const inputValue = e.target.value;

    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      const index = updatedValues.findIndex((_, idx) => idx === inputId);
      if (index !== -1) {
        updatedValues[index] = { inputId, value: inputValue };
      } else {
        updatedValues.push({ inputId, value: inputValue });
      }

      return updatedValues;
    });
  };
  return (
    <div style={{ marginBottom: "6rem" }}>
      <h1>Add Specimen</h1>
      <h3>SAVED ID'S</h3>
      <pre>{JSON.stringify(savedLabtests.savedSelectedDatas, null, 4)}</pre>
      <h3>SPECIMEN COUNT</h3>
      <pre>{JSON.stringify(savedLabtests.specimenCount, null, 4)}</pre>
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
          <th style={{ borderRight: "1px solid red" }}>Qty/Volume</th>
        </thead>
        <tbody>
          {savedLabtests?.savedSpecimensArr?.map((data) => (
            <tr key={data}>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {data.specimen}
              </td>
              <td style={{ color: "green", paddingLeft: "2rem" }}>
                {
                  data?.specimenQuantity?.find((data) => Math.min(data.minTest))
                    ?.minVolume
                }
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
      <Modal
        title="Dynamic Form"
        open={showLabReqModal}
        onCancel={handleCloseLabReqModal}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {selectedLabtestRequirements?.map((input, index) => (
            <div key={index}>
              <label>{input.requirementDetails}</label>
              <TextField
                key={index}
                required={input.isRequired}
                type={
                  inputTypeOptions.find(
                    (_, inputTypeIdx) => inputTypeIdx === input.requirementType
                  )?.type || "text"
                }
                value={
                  inputValues.find((value, inputIdx) => inputIdx === index)
                    ?.value || ""
                }
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
          ))}
        </Box>
      </Modal>
      <Button type="primary">Submit Order</Button>
    </div>
  );
};

export default AddSpecimen;
