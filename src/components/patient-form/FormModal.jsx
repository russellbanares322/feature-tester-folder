import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const FormModal = ({ handleCloseModal, inputs, handleChangeFields }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeFields({ firstname: inputs.firstname });
    handleChangeFields({ lastname: inputs.lastname });
    handleCloseModal();
  };

  const handleAddEmail = (selectedEmail) => {
    handleChangeFields({ email: [...inputs.email, selectedEmail] });
    setInput("");
  };
  const handleEnterEmail = (e) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();

      let email = e.target.value.trim();
      if (email && isValid(input)) {
        handleChangeFields({
          email: [...inputs.email, email],
        });
        setInput("");
      }
    }
    if (inputs.email.includes(input)) {
      return alert(`${input} is already added, try a new one!`);
    }
  };
  const isValid = (value) => {
    let errorMessage = null;

    if (!isEmail(value)) {
      errorMessage = `${value} is not a valid email address.`;
    }
    if (inList(value)) {
      errorMessage = `${value} has already been added.`;
    }
    if (errorMessage) {
      setError(errorMessage);
      return false;
    }
    return true;
  };

  const isEmail = (value) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(value);
  };
  const inList = (value) => {
    return inputs.email.includes(value);
  };

  const handlePaste = (e) => {
    e.preventDefault();

    let paste = e.clipboardData.getData("text");
    let emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      let toBeAdded = emails.filter((email) => inList(email));

      handleChangeFields({
        email: [...inputs.email, ...toBeAdded],
      });
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setError("");
  };
  const handleRemove = (selectedEmail) => {
    const newEmails = inputs.email.filter((m) => m !== selectedEmail);
    handleChangeFields({ email: newEmails });
  };
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h5>{JSON.stringify(inputs.email)}</h5>
        <button type="button" onClick={handleCloseModal}>
          Close
        </button>
        <input
          type="text"
          value={inputs.firstname}
          onChange={(e) => handleChangeFields({ firstname: e.target.value })}
        />
        <input
          value={inputs.lastname}
          type="text"
          onChange={(e) => handleChangeFields({ lastname: e.target.value })}
        />
        <button onClick={handleSubmit} type="button">
          Add
        </button>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {inputs?.email?.map((m, index) => (
            <p
              style={{
                backgroundColor: "greenyellow",
                color: "white",
                borderRadius: "4rem",
                marginTop: "0.5rem",
              }}
              key={index}
            >
              {m}

              <span onClick={() => handleRemove(m)}>X</span>
            </p>
          ))}
          <input
            value={input}
            onChange={handleChange}
            onKeyDown={(e) => handleEnterEmail(e)}
            onPaste={handlePaste}
            type="email"
          />
          {input.includes("@") && input.length > 6 && (
            <p onClick={handleAddEmail} className={styles.result}>
              {input}
            </p>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FormModal;
