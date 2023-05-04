import {
  Grid,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import Autocomplete from "../Grids/Autocomplete";

const Dboard = () => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formInput, setFormInput] = useState({
    id: Math.floor(Math.random()),
    provinceId: 0,
    cityMunicipalityId: 0,
    barangayId: 0,
    streetName: "",
  });

  const dummy = [
    {
      no: 1,
      code: 1001,
      specimenType: "Serum",
    },
    {
      no: 2,
      code: 1002,
      specimenType: "Hepi",
    },
    {
      no: 3,
      code: 1003,
      specimenType: "EDTA / Taruby",
    },
  ];
  const [phAddresses, setPhAddresses] = useState([
    {
      id: 16,
      provinceId: 9,
      cityMunicipalityId: 10,
      barangayId: 3,
      streetName: "Blk 23 street react",
    },
    {
      id: 9,
      provinceId: 3,
      cityMunicipalityId: 2,
      barangayId: 5,
      streetName: "Blk 25 street react",
    },
  ]);

  const handleSelectAddress = (address) => {
    setFormInput({ ...address });
    setSelectedAddressId(address.id);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPhAddresses((prevAddress) =>
      prevAddress.map((a) =>
        a.id === selectedAddressId
          ? {
              ...a,
              ...formInput,
            }
          : a
      )
    );
  };
  const handleCancel = () => {
    setFormInput({
      id: 0,
      provinceId: 0,
      cityMunicipalityId: 0,
      barangayId: 0,
      streetName: "",
    });
    setSelectedAddressId(null);
  };
  return (
    <Grid sx={{ display: "flex", flexWrap: "wrap-reverse" }} container>
      <Grid xs={12} sm={12} md={12} lg={9} xl={9}>
        <Box sx={{ height: "100vh", backgroundColor: "maroon" }}>
          <Box sx={{ margin: "0 auto", padding: "1rem" }}>
            <Box
              sx={{ backgroundColor: "white", height: "70vh", padding: "1rem" }}
            >
              <Box sx={{ display: "flex" }}>
                {phAddresses.map((a) => (
                  <Box key={a.id}>
                    <h1>{a.id}</h1>
                    <h1>{a.provinceId}</h1>
                    <h1>{a.barangayId}</h1>
                    <h1>{a.cityMunicipalityId}</h1>
                    <h1>{a.streetName}</h1>
                    <Button
                      onClick={() => handleSelectAddress(a)}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </Box>
                ))}
              </Box>
              <Box component="form">
                <TextField
                  value={formInput.provinceId}
                  onChange={handleChange}
                  name="provinceId"
                  id="outlined-basic"
                  label="province"
                  variant="outlined"
                  sx={{ marginTop: "2rem", marginBottom: "1rem" }}
                  placeholder="province"
                />
                <TextField
                  value={formInput.barangayId}
                  onChange={handleChange}
                  name="barangayId"
                  id="outlined-basic"
                  label="barangay"
                  variant="outlined"
                  sx={{ marginTop: "2rem", marginBottom: "1rem" }}
                  placeholder="barangay"
                />
                <TextField
                  value={formInput.cityMunicipalityId}
                  onChange={handleChange}
                  name="cityMunicipalityId"
                  id="outlined-basic"
                  label="municipality"
                  variant="outlined"
                  sx={{ marginTop: "2rem", marginBottom: "1rem" }}
                  placeholder="municipality"
                />
                <TextField
                  value={formInput.streetName}
                  onChange={handleChange}
                  name="streetName"
                  id="outlined-basic"
                  label="street name"
                  variant="outlined"
                  sx={{ marginTop: "2rem", marginBottom: "1rem" }}
                  placeholder="street name..."
                />
              </Box>
              <Button onClick={handleSave} variant="contained">
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="contained">
                Cancel
              </Button>
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
            </Box>
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

      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "9fr 30fr 30fr",
          }}
        >
          <Typography variant="p">No</Typography>
          <Typography variant="p">Code</Typography>
          <Typography variant="p">Specimen Type</Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid red",
            borderRadius: "0.5rem",
            padding: "0.2rem",
          }}
        >
          {dummy.map((a) => (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "9fr 30fr 30fr",
              }}
              key={a.no}
            >
              <Typography variant="p">{a.no}</Typography>
              <Typography variant="p">{a.code}</Typography>
              <Typography variant="p">{a.specimenType}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default Dboard;
