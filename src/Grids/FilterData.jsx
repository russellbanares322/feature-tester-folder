import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { notification } from "antd";

const codeData = [
  {
    id: 1,
    displayName: "1001 - OneTest Abc",
    child: [
      {
        id: 3,
        displayName: "1003 - TwoTest Xbc",
      },
    ],
  },
  {
    id: 2,
    displayName: "1002 - TwoTest Xbc",
    child: [
      {
        id: 4,
        displayName: "1004 - ThreeTest Ybc",
      },
    ],
  },
  {
    id: 3,
    displayName: "1003 - TwoTest Xbc",
  },
  {
    id: 4,
    displayName: "1004 - ThreeTest Ybc",
  },
  {
    id: 5,
    displayName: "1005 - FourTest Zbc",
  },
];

const FilterData = () => {
  const [codeOptions] = useState(codeData);
  const [addedCodeArr, setAddedCodeArr] = useState([]);

  const handleAddCode = (selectedCode) => {
    const isCodeAlreadyAdded = addedCodeArr.includes(selectedCode);
    if (isCodeAlreadyAdded) {
      return notification.warning({
        message: "Failed to add code",
        description: `${selectedCode.displayName} is already added`,
      });
    }

    setAddedCodeArr((prevSelectedCode) => {
      let updatedData = [...prevSelectedCode];

      if (selectedCode.child) {
        const conflictingDataWithoutChild = updatedData.filter(
          (option) => !option.child && option.id !== selectedCode.id
        );
        // Check if the selected option conflicts with existing data without children

        // Remove conflicting data without children
        updatedData = updatedData.filter(
          (option) => !conflictingDataWithoutChild.includes(option)
        );

        // Check if the selected option is already inside a child of another option
        const conflictingChildData = updatedData.filter((option) =>
          option.child
            ? option.child.some((child) => child.id === selectedCode.id)
            : false
        );

        if (conflictingChildData.length > 0) {
          // Remove conflicting child data
          updatedData = updatedData.filter((option) => {
            if (option.child) {
              option.child = option.child.filter(
                (child) => child.id !== selectedCode.id
              );
            }
            return option;
          });
        }

        // Add selected option to selectedData
        updatedData = [selectedCode, ...updatedData];
      } else {
        // Check if the selected option conflicts with existing data with children
        const conflictingDataWithChild = updatedData.filter((option) =>
          option.child
            ? option.child.some((child) => child.id === selectedCode.id)
            : false
        );

        if (conflictingDataWithChild.length === 0) {
          // Add selected option to selectedData
          updatedData = [...updatedData, selectedCode];
        } else {
          // Display alert for conflict with data without children
          notification.warning({
            message: "Failed to add code",
            description: `${selectedCode.displayName} is already selected.`,
          });
        }
      }

      return updatedData;
    });
  };
  return (
    <div>
      <h1>Filter Data</h1>
      {JSON.stringify(addedCodeArr)}
      <Autocomplete
        disableClearable
        getOptionLabel={(option) => option.displayName}
        onChange={(event, newInputValue) => {
          handleAddCode(newInputValue);
        }}
        options={codeOptions}
        sx={{ width: 300, backgroundColor: "white" }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Add data in table" />
        )}
      />
      <br />
      <table>
        <thead>
          <th>ID</th>
          <th>Display Name</th>
        </thead>
        {addedCodeArr &&
          addedCodeArr.map((code) => (
            <tbody key={code.id}>
              <td>{code.id}</td>
              <td>{code.displayName}</td>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default FilterData;
