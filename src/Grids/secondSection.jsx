import React from "react";
import { Grid, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { DatePicker } from "@mui/x-date-pickers";

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
          inputProps={{
            style: {
              height: "50px",
            },
          }}
        />
      </Grid>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Basic time picker"
            sx={{
              position: "relative",
              "::after": {
                content: '"🕓"',
                position: "absolute",
                right: 11,
                top: 16,
                pointerEvents: "none",
                cursor: "pointer",
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider> */}
      <TextField type="time" />
      <TextField type="date" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
      <table>
        <thead>
          <th>No.</th>
          <th>Code</th>
          <th>Specimen</th>
        </thead>
        <tbody style={{ border: "1px solid red", height: "3rem" }}>
          <td>1</td>
          <td>1234</td>
          <td>Abc taruby</td>
        </tbody>
      </table>
    </Grid>
  );
};

export default SecondSection;
