import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onUnload = useCallback(
    (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Save your changes";
      }
    },
    [isDirty]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstname", { required: true })}
        placeholder="Enter your firstname"
        type="text"
      />
      <input
        {...register("lastname", { required: true })}
        placeholder="Enter your lastname"
        type="text"
      />
      <input {...register("gender")} name="gender" value="male" type="radio" />
      Male
      <input
        {...register("gender")}
        name="gender"
        value="female"
        type="radio"
      />
      Female
      <input type="date" {...register("date")} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
