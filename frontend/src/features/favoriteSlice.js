import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
};

export const cartSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addFavoriteScientist: (state, action) => {
      state.people.push(action.payload);
    },
    getFavoriteScientists: (state, action) => {
      state.people = action.payload;
    },
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
