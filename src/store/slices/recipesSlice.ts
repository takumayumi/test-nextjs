import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeProps, RecipesState } from "@/types";

const initialState: RecipesState = {
  items: [],
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<RecipeProps[]>) {
      state.items = action.payload;
    },
    updateFavorite(
      state,
      action: PayloadAction<{ id: string; isFavorite: boolean }>
    ) {
      const { id, isFavorite } = action.payload;
      const index = state.items.findIndex((r) => r.id === id);
      if (index !== -1) {
        state.items[index].isFavorite = isFavorite;
        state.items[index].lastUpdated = Date.now().toString();
      }
    },
  },
});

export const { setRecipes, updateFavorite } = recipesSlice.actions;
export default recipesSlice.reducer;
