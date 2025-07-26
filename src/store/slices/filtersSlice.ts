import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateSortOrder, FilterOptions, TitleSortOrder } from "@/types";

const initialState: FilterOptions = {
  searchTerm: "",
  isFavorite: null,
  sortByTitle: null,
  sortByDate: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFavoriteFilter: (state, action: PayloadAction<boolean | null>) => {
      state.isFavorite = action.payload;
    },
    setSortByTitle: (state, action: PayloadAction<TitleSortOrder | null>) => {
      state.sortByTitle = action.payload;
    },
    setSortByDate: (state, action: PayloadAction<DateSortOrder | null>) => {
      state.sortByDate = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const {
  setSearchTerm,
  setFavoriteFilter,
  setSortByTitle,
  setSortByDate,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
