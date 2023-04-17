import React, { useState } from "react";
import styles from "./styles.module.css";

const FormModal = ({ handleCloseModal, inputs, handleChangeFields }) => {
  const [input, setInput] = useState("");
  const handleSubmit = () => {
    handleChangeFields({ firstname: inputs.firstname });
    handleChangeFields({ lastname: inputs.lastname });
    handleCloseModal();
  };

  const handleAddEmail = (selectedEmail) => {
    handleChangeFields({ email: [...inputs.email, selectedEmail] });
    setInput("");
  };

  const handleRemove = (selectedEmail) => {
    const newEmails = inputs.email.filter((m) => m !== selectedEmail);
    handleChangeFields({ email: newEmails });
  };
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h5>{JSON.stringify(inputs.email)}</h5>
        <button onClick={handleCloseModal}>Close</button>
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
            onChange={(e) => setInput(e.target.value)}
            type="email"
          />
          {input.includes("@") && input.length > 6 && (
            <p onClick={() => handleAddEmail(input)}>{input}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormModal;
