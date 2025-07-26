import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filtersSlice";
import recipesReducer from "./slices/recipesSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    recipes: recipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
