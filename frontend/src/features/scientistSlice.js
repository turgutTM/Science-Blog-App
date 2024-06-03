import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scientists: [],
  recommendedScientist: {},
};

export const scientistSlice = createSlice({
  name: "scientists",
  initialState,
  reducers: {
    addScientist: (state, action) => {
      state.scientists.push(action.payload);
    },
    deleteScientist: (state, action) => {
      state.scientists = state.scientists.filter(
        (scientist) => scientist._id !== action.payload
      );
    },
    setScientists: (state, action) => {
      state.scientists = action.payload;
    },
    setRecommendedScientists: (state, action) => {
      state.recommendedScientist = action.payload;
    },
  },
});

export const {
  addScientist,
  deleteScientist,
  setScientists,
  setRecommendedScientist,
} = scientistSlice.actions;

export default scientistSlice.reducer;
