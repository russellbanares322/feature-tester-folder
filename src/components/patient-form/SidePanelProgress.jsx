import React from "react";

const SidePanelProgress = ({ steps, currentStepIndex }) => {
  return (
    <div style={{ backgroundColor: "gray", height: "100%", width: "30%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "5rem",
          gap: "3rem",
        }}
      >
        {steps.map((_, index) => (
          <h4
            key={index}
            style={{
              backgroundColor: currentStepIndex === index ? "yellow" : "white",
              color: "black",
              borderRadius: "50%",
              width: "2rem",
              height: "2rem",
              paddingLeft: "0.73rem",
              paddingTop: "0.2rem",
            }}
          >
            {index + 1}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default SidePanelProgress;
