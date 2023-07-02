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
const DragAndDrop = () => {
  const [datas, setDatas] = useState(randomData);
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

  return (
    <div style={{ position: "relative" }}>
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
