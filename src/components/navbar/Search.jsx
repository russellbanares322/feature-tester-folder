import React, { useState } from "react";
import styles from "./styles.module.css";

const names = [
  {
    name: "Sclaoas",
  },
  {
    name: "Jake",
  },
  {
    name: "Aim",
  },
  {
    name: "Neo",
  },
  {
    name: "Kel",
  },
  {
    name: "Dop",
  },
  {
    name: "Csx",
  },
];

builder.addcase(state =>  {
  fetchPatient.rejecte
}) 
const Search = () => {
  const [namesData, setNamesData] = useState(names);
  const [searchInput, setSearchInput] = useState("");
  const [showNames, setShowNames] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);

  const handleAddName = (e, selectedData) => {
    e.stopPropagation();
    const data = namesData?.filter((d) => d?.name !== selectedData?.name);
    setNamesData(data);
    setSelectedNames([...selectedNames, { name: selectedData.name }]);
  };
  console.log(selectedNames, namesData);

  const handleRemoveName = (e, selectedData) => {
    e.stopPropagation();
    const removedNames = selectedNames.filter(
      (d) => d?.name !== selectedData?.name
    );
    setSelectedNames(removedNames);

    setNamesData([...namesData, { name: selectedData.name }]);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <div
        style={{
          border: "1px solid red",
          height: "8rem",
          color: "black",
          width: "15rem",
        }}
      >
        {selectedNames?.map((data, index) => (
          <div key={index} style={{ display: "flex", gap: "20px" }}>
            <p>{data.name}</p>
            <p
              style={{ cursor: "pointer" }}
              onClick={(e) => handleRemoveName(e, data)}
            >
              X
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            onFocus={() => setShowNames(true)}
            type="text"
            onChange={handleChange}
            placeholder="search here..."
          />

          {showNames && (
            <div
              style={{
                background: "gray",
                height: "7rem",
                color: "white",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {namesData?.map((d, index) => (
                <p
                  onClick={(e) => handleAddName(e, d)}
                  className={styles.names}
                  key={index}
                >
                  {d.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
