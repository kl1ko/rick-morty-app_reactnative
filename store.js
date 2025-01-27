import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const colors = {
  darkblue: "#0a192f",
  midblue: "rgba(23, 42, 69, 0.8)",
  blue: "#007bff",
  gray: "gray",
};

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
