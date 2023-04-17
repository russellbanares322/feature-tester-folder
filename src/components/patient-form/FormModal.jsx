import React from "react";
import styles from "./styles.module.css";

const FormModal = ({ handleCloseModal, inputs, handleChangeFields }) => {
  const handleSubmit = () => {
    handleChangeFields({ firstname: inputs.firstname });
    handleChangeFields({ lastname: inputs.lastname });
    handleCloseModal();
  };
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
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
      </div>
    </div>
  );
};

export default FormModal;
