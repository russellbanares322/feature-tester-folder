import { Button } from "antd";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
const randomData = [
  {
    id: 1,
    name: "Max",
  },
  {
    id: 2,
    name: "Mick",
  },
];

const arrayOne = [
  {
    name: "Serum",
    quantity: 1,
  },
  {
    name: "Skin",
    quantity: 3,
  },
  {
    name: "Skin",
    quantity: 0,
  },
  {
    name: "Plasma",
    quantity: 0,
  },
  {
    name: "Xyz",
    quantity: 0,
  },
  {
    name: "404",
    quantity: 0,
  },
];

const arrayTwo = [
  {
    name: "Serum",
  },
  {
    name: "Serum",
  },
  {
    name: "Serum",
  },
  {
    name: "Skin",
  },
  {
    name: "Plasma",
  },
  {
    name: "Xyz",
  },
];

const DragAndDrop = () => {
  const [datas, setDatas] = useState(randomData);
  const [savedArrData, setSavedArrData] = useState(null);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDragStart = (e, selectedDataId) => {
    setShowDeleteIcon(true);
    setSelectedId(selectedDataId);
  };

  const handleDragEnd = (e) => {
    setShowDeleteIcon(false);
  };

  const handleAllowDrop = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const filteredDatas = datas.filter((data) => data.id !== selectedId);
    setDatas(filteredDatas);
    setShowDeleteIcon(false);
  };

  const handleAddArrOne = () => {
    setSavedArrData(arrayOne);
  };
  const handleAddArrTwo = () => {
    setSavedArrData(
      savedArrData.map((data) => ({
        ...data,
        quantity:
          data.quantity +
          parseInt(
            arrayTwo.filter((item) => item.name.includes(data.name)).length
          ),
      }))
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <h1>ADD ME</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 0.5rem",
        }}
      >
        <pre>{JSON.stringify(savedArrData, null, 4)}</pre>
        <pre>{JSON.stringify(arrayTwo, null, 4)}</pre>
      </div>
      <br />
      <br />
      <Button
        disabled={savedArrData !== null}
        onClick={handleAddArrOne}
        type="primary"
      >
        ARRAY ONE
      </Button>
      <Button
        disabled={savedArrData === null}
        onClick={handleAddArrTwo}
        type="primary"
        danger
      >
        ARRAY TWO
      </Button>
      <h1>DRAG AND DROP</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        {datas.map((data) => (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, data.id)}
            onDragEnd={handleDragEnd}
            key={data.id}
            style={{ backgroundColor: "gray", cursor: "move" }}
          >
            <h1>{data.name}</h1>
          </div>
        ))}
      </div>
      {showDeleteIcon && (
        <div
          onDragOver={handleAllowDrop}
          onDrop={handleDrop}
          style={{
            position: "absolute",
            left: 0,
            top: 50,
            bottom: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "whitesmoke",
            width: "5rem",
            height: "5rem",
            borderRadius: "5rem",
            margin: "0 auto",
          }}
        >
          <MdDelete color="red" size={30} />
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
