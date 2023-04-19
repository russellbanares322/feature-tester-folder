import React from "react";
import { Box } from "@mui/material";
import FirstSection from "./firstSection";
import SecondSection from "./secondSection";

const FStep = () => {
  return (
    <Box sx={{ flexGrow: 1 }} p={4}>
      <FirstSection />
      <SecondSection />
      <SecondSection />
      <SecondSection />
      <SecondSection />
      <SecondSection />
      <SecondSection />
      <SecondSection />
      <SecondSection />
    </Box>
  );
};

export default FStep;
