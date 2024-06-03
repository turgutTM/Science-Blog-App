import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.currentUser = {};
      localStorage.removeItem("currentUser");
    },
    toggleFavoriteScientist: (state, action) => {
      const { scientistId } = action.payload;
      const { currentUser } = state;

      if (currentUser) {
        const { favoriteScientists } = currentUser;
        const isFavorite = favoriteScientists
          ? favoriteScientists.includes(scientistId)
          : false;

        if (isFavorite) {
          state.currentUser = {
            ...currentUser,
            favoriteScientists: favoriteScientists.filter(
              (id) => id !== scientistId
            ),
          };
        } else {
          state.currentUser = {
            ...currentUser,
            favoriteScientists: favoriteScientists
              ? [...favoriteScientists, scientistId]
              : [scientistId],
          };
        }

        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
  },
});

export const { setCurrentUser, logoutUser, toggleFavoriteScientist } =
  userSlice.actions;

export default userSlice.reducer;
