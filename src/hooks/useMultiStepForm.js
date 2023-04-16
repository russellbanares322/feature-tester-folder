import React, { useState } from "react";

export const useMultiStepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex >= steps.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    });
  };

  const handlePrev = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return prevIndex;
      }
      return prevIndex - 1;
    });
  };

  return {
    currentStepIndex,
    handleNext,
    handlePrev,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    steps,
  };
};
