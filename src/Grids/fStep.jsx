import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import FirstSection from "./firstSection";
import SecondSection from "./secondSection";
import AutoComplete from "./Autocomplete";
import Dboard from "./Dboard";

const FStep = () => {
  const [step, setStep] = useState(1);

  return <Box sx={{ flexGrow: 1 }} p={4}></Box>;
};

export default FStep;
