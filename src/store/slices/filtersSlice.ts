import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterOptions } from "@/types";

const initialState: FilterOptions = {
  searchTerm: "",
  isFavorite: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFavoriteFilter: (state, action: PayloadAction<boolean | null>) => {
      state.isFavorite = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const { setSearchTerm, setFavoriteFilter, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
