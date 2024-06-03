import { configureStore } from "@reduxjs/toolkit";
import scientistReducer from "../features/scientistSlice";
import userReducer from "../features/userSlice";
import cartReducer from "../features/favoriteSlice"

export const store = configureStore({
  reducer: {
    scientist: scientistReducer,
    user: userReducer,
    cart:cartReducer,
  },
});
