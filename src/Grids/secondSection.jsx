import React from "react";
import { Grid, TextField } from "@mui/material";

const SecondSection = () => {
  return (
    <Grid rowSpacing={2} columnSpacing={4} sx={{ marginTop: 3 }} container>
      <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
        <h3>Patient Search</h3>
        <TextField
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "20rem",
              lg: "25rem",
              xl: "25rem",
            },
          }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
      </Grid>
      <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
        <h3>Some field</h3>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
      </Grid>
      <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
        <h3>Medical no.</h3>
        <TextField
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: {
              xs: "start",
              sm: "start",
              md: "end",
              lg: "end",
              xl: "end",
            },
          }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default SecondSection;
