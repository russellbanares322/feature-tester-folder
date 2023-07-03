import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedTestArr: [],
  savedSpecimensArr: [],
  savedSelectedDatas: [],
};
const savedLabtestSlice = createSlice({
  initialState,
  name: "savedLabtests",
  reducers: {
    handleChangeLabtestData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { handleChangeLabtestData } = savedLabtestSlice.actions;
export default savedLabtestSlice.reducer;
