import { Grid, Box } from "@mui/material";
import React from "react";

const Dboard = () => {
  return (
    <Grid sx={{ display: "flex", flexWrap: "wrap-reverse" }} container>
      <Grid xs={12} sm={12} md={12} lg={9} xl={9}>
        <Box sx={{ height: "100vh", backgroundColor: "maroon" }}>
          <Box sx={{ margin: "0 auto", padding: "1rem" }}>
            <Box sx={{ backgroundColor: "white", height: "70vh" }}>hello</Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={3} xl={3}>
        <Box
          sx={{
            height: {
              xs: "30vh",
              sm: "30vh",
              md: "30vh",
              lg: "100vh",
              xl: "100vh",
            },
            backgroundColor: "blue",
          }}
        ></Box>
      </Grid>
    </Grid>
  );
};

export default Dboard;
