import React, { useState } from "react";
import Hero from "../hero/Hero";
import Offers from "../offers/Offers";
import OtherOffers from "../offers/OtherOffers";
import Contact from "../contact/Contact";

const searchInput = [
  {
    type: "text",
  },
  {
    type: "text",
  },
];

const Home = () => {
  const [inputValue, setInputValue] = useState(searchInput);

  const handleAddInput = () => {
    const newInput = { type: "text" };

    setInputValue([...inputValue, newInput]);
    console.log(inputValue);
  };
  return (
    <div>
      <div style={{ height: "40vh", backgroundColor: "gray" }}>
        <button onClick={handleAddInput}>Add row</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {inputValue.map((val, idx) => (
            <div
              key={idx}
              style={{
                marginRight: "1rem",
                display: "inline",
              }}
            >
              inputs <input type={val.type} />
              <br />
            </div>
          ))}
        </div>
      </div>
      <Hero />
      <Offers />
      <OtherOffers />
      <Contact />
    </div>
  );
};

export default Home;
