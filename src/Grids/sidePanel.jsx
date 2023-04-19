import React from "react";
import { Box } from "@mui/material";

const SidePanel = () => {
  return (
    <Box
      sx={{
        background: "cyan",
        height: {
          xs: "8rem",
          sm: "8rem",
          md: "8rem",
          lg: 1,
          xl: 1,
        },
        width: {
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
        },
        position: {
          xs: "static",
          sm: "static",
          md: "static",
          lg: "fixed",
          xl: "fixed",
        },
      }}
    >
      <h1>TEST</h1>
      <h1>TEST</h1>
    </Box>
  );
};

export default SidePanel;
