import { Button } from "@mui/material";
import React, { useState } from "react";

const DisplayOrder = ({ data, depth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div style={{ marginTop: "0.3" }}>
      <div
        style={
          data?.child
            ? {
                background: "whitesmoke",
                display: "flex",
                marginTop: "1rem",
                padding: "0.5rem",
                borderRadius: "0.6rem",
              }
            : {
                backgroundColor: "dimgrey",
                display: "flex",
                marginTop: "1rem",
                padding: "0.5rem",
                borderRadius: "0.6rem",
              }
        }
      >
        <Button
          sx={{
            height: "2rem",
            width: "1rem",
            opacity: data?.child ? "1" : "0",
            cursor: data?.child ? "pointer" : "default",
            marginRight: "0.5rem",
          }}
          onClick={handleExpand}
          variant="outlined"
          color="primary"
        >
          {isExpanded && data?.child ? "-" : "+"}
        </Button>
        <div>
          <h3>Code: {data.code}</h3>
          <h3>Order Type: {data.orderType}</h3>
          <h3>Specimen: {data.specimen}</h3>
        </div>
      </div>
      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 2}px` }}>
          {data.child?.map((data) => (
            <DisplayOrder key={data.id} data={data} depth={depth + 10} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayOrder;
