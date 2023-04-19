import { Grid } from "@mui/material";
import React from "react";

const FirstSection = () => {
  return (
    <Grid container>
      <Grid xs={6} sm={6} md={2} lg={2} xl={2} item>
        <h3>Client No.</h3>
        <h4>RS001</h4>
      </Grid>
      <Grid
        sx={{
          textAlign: { lg: "start", md: "start", sm: "end", xs: "end" },
        }}
        xs={6}
        sm={6}
        md={8}
        lg={8}
        xl={8}
        item
      >
        <h3>Patient Name</h3>
        <h4>John Doe</h4>
      </Grid>
      <Grid
        sx={{
          textAlign: { lg: "end", md: "end", sm: "start", xs: "start" },
        }}
        xs={12}
        sm={12}
        md={2}
        lg={2}
        xl={2}
        item
      >
        <h3>Order No.</h3>
        <h4>[pending...]</h4>
      </Grid>
    </Grid>
  );
};

export default FirstSection;
