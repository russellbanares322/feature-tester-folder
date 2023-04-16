import axios from "axios";
import React, { useState, useEffect } from "react";

const initialData = {
  title: "",
  brand: "",
  category: "",
};
const AnotherTest = () => {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState(initialData);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sub, setSub] = useState([]);

  const handleChangeInputs = (fields) => {
    setInputs((prev) => {
      return { ...prev, ...fields };
    });
  };
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setData(res.data.products);
    });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
  }, [search, data]);

  const handleSelectPatient = (selectedPatient) => {
    handleChangeInputs({ title: selectedPatient.title });
    handleChangeInputs({ brand: selectedPatient.brand });
    handleChangeInputs({ category: selectedPatient.category });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSub(inputs);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90rem",
      }}
    >
      {JSON.stringify(sub)}
      <form onSubmit={handleSubmit}>
        <input
          value={inputs.title}
          onChange={(e) => handleChangeInputs({ title: e.target.value })}
          name="title"
          placeholder="title"
          type="text"
        />
        <input
          value={inputs.brand}
          onChange={(e) => handleChangeInputs({ brand: e.target.value })}
          name="brand"
          placeholder="brand"
          type="text"
        />
        <input
          value={inputs.category}
          onChange={(e) => handleChangeInputs({ category: e.target.value })}
          name="category"
          placeholder="category"
          type="text"
        />
        <div style={{ width: "15rem" }}>
          <input
            placeholder="search"
            onChange={handleChange}
            style={{
              width: "15rem",
            }}
            type="text"
          />
          {search && (
            <div
              style={{
                background: "gray",
                height: "auto",
                width: "auto",
              }}
            >
              {results.length > 0 ? (
                results.slice(0, 5).map((product) => (
                  <p
                    style={{ fontSize: "15px", cursor: "pointer" }}
                    key={product?.id}
                    onClick={() => handleSelectPatient(product)}
                  >
                    {product?.title}
                  </p>
                ))
              ) : (
                <p>Add new</p>
              )}
            </div>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AnotherTest;
