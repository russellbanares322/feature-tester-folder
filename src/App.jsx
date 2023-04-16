import "./App.css";
import { useEffect, useState } from "react";
import FormContent from "./components/patient-form/FormContent";
import AnotherTest from "./components/navbar/AnotherTest";

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

  return (
    <div className="App">
      <AnotherTest />
      <FormContent />
      {/* <Form />
      <Search />
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
      </div> */}
    </div>
  );
}

export default App;
