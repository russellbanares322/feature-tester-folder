import { configureStore } from "@reduxjs/toolkit";
import savedLabtestReducer from "../slice/SavedLabTestSlice";

const store = configureStore({
  reducer: {
    savedLabtests: savedLabtestReducer,
  },
});

export default store;
