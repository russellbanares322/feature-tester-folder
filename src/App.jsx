import "./App.css";
import { useEffect, useState } from "react";
import FormContent from "./components/patient-form/FormContent";
import AnotherTest from "./components/navbar/AnotherTest";
import FirstSection from "./Grids/firstSection";
import FStep from "./Grids/fStep";
import { createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import SidePanel from "./Grids/sidePanel";
import { Route, Routes } from "react-router-dom";
import FormModal from "./components/patient-form/FormModal";
import Dboard from "./Grids/Dboard";
import AutoComplete from "./Grids/AutoComplete";
import DynamicInputs from "./Grids/DynamicInputs";
import OrderDataLayout from "./Grids/OrderDataLayout";
import AntDesignRecursive from "./Grids/AntDesignRecursive";
import Ldboard from "./Grids/Ldboard";
import FilterData from "./Grids/FilterData";
import NestedArrUpdate from "./NestedArrUpdate/NestedArrUpdate";

function Entry({ entry, depth }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p
        style={
          entry.children
            ? {
                cursor: "pointer",
                background: "gray",
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }
            : {
                background: "whitesmoke",
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }
        }
        onClick={handleExpand}
      >
        {isExpanded && entry.children ? "-" : "+"}
        {entry.name}
      </p>
      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 15}px` }}>
          {entry?.children?.map((entry) => (
            <Entry key={entry.id} entry={entry} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const files = {
    children: [
      {
        name: "components",
        children: [
          {
            name: "navbar",
            children: [
              {
                name: "navbar.jsx",
              },
            ],
          },
        ],
      },
      {
        name: "assets",
        children: [
          {
            name: "image.svg",
          },
        ],
      },
      {
        name: "package.json",
      },
      {
        name: "index.html",
      },
    ],
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const theme = createTheme({
    palette: {
      darkBlue: {
        main: "#001E3C",
      },
      xRed: {
        main: "#F15757",
      },
      incognitoGray: {
        main: "#DADCE0",
      },
    },
  });
  return (
    <>
      <Routes>
        <Route path="/ldboard" element={<Ldboard />} />
      </Routes>
      <ThemeProvider theme={theme}>
        <NestedArrUpdate />
        <hr />
        <hr />
        <hr />
        <FilterData />
        <hr />
        <AntDesignRecursive />
        <hr />
        <OrderDataLayout />
        <hr />
        <DynamicInputs />
        <AutoComplete />
        <Dboard />
        <div>
          <Typography sx={{ color: "incognitoGray.main" }} variant="h1">
            Test
          </Typography>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexWrap: "wrap-reverse",
              maxHeight: "100%",
              minHeight: "100%",
              height: "100%",
              border: "1px solid green",
            }}
            container
          >
            <Grid
              sx={{ border: "1px solid pink" }}
              xs={12}
              sm={12}
              md={12}
              lg={9}
              xl={9}
              item
            >
              <div
                style={{
                  backgroundColor: "white",
                  margin: "2rem 3rem",
                  borderRadius: "0.4rem",
                }}
              >
                <FStep />
                <FormContent />
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={3} xl={3} item>
              <SidePanel />
            </Grid>
            <AnotherTest />
            <FormContent />
            <div
              style={{
                marginTop: "4rem",
                marginBottom: "4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                {files.children?.map((entry) => (
                  <Entry key={entry.id} entry={entry} depth={1} />
                ))}
              </div>
            </div>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
