import { Chip } from "@mui/material";
import React, { useState } from "react";
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
    if (inputs.email.length === 2) {
      return;
    }
    handleChangeFields({ email: [...inputs.email, selectedEmail] });
    setInput("");
  };
  const handleEnterEmail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let email = e.target.value.trim();
      if (email && isValid(input)) {
        handleChangeFields({
          email: [...inputs.email, email],
        });
        setInput("");
      }
    }

    if (input === "" && e.key === "Backspace" && inputs.email.length > 0) {
      const newEmail = [...inputs.email];
      newEmail.pop();
      handleChangeFields({ email: newEmail });
    }
    if (inputs.email.includes(input)) {
      return setError(`${input} is already added, try a new one!`);
    }
    if (inputs.email.length === 2) {
      return;
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
    let paste = e.clipboardData.getData("text");
    let emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      let toBeAdded = emails.filter((email) => !inList(email));

      handleChangeFields({
        email: [...inputs.email, ...toBeAdded],
      });
      setError("");
      setInput("");
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
        <h5>{JSON.stringify(inputs?.email)}</h5>
        <button type="button" onClick={handleCloseModal}>
          Close
        </button>
        <input
          type="text"
          value={inputs?.firstname}
          onChange={(e) => handleChangeFields({ firstname: e.target.value })}
        />
        <input
          value={inputs?.lastname}
          type="text"
          onChange={(e) => handleChangeFields({ lastname: e.target.value })}
        />
        <button onClick={handleSubmit} type="button">
          Add
        </button>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div
          onKeyDown={handleEnterEmail}
          tabIndex={1}
          className={styles["email-input"]}
        >
          <ul>
            {inputs?.email?.map((em, index) => (
              <li key={index}>
                <Chip
                  sx={{ fontSize: "1rem" }}
                  label={em}
                  onDelete={() => handleRemove(em)}
                />
              </li>
            ))}
          </ul>
          <input
            placeholder="Input your email"
            value={input}
            onChange={handleChange}
            onKeyDown={(e) => handleEnterEmail(e)}
            onPaste={handlePaste}
            type="email"
          />
          <div className={styles["suggestion-wrapper"]}>
            {input.includes("@") && input.length > 6 && (
              <p
                tabIndex={0}
                onClick={() => handleAddEmail(input)}
                onKeyDown={() => console.log(input)}
                className={styles.result}
              >
                {input}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
