import { RecipeProps } from "@/types";

export interface FilterOptions {
  searchTerm?: string;
  isFavorite?: boolean | null;
  sortByTitle?: TitleSortOrder | null;
  sortByDate?: DateSortOrder | null;
}

export type DateSortOrder = "date-asc" | "date-desc" | null;
export type TitleSortOrder = "title-asc" | "title-desc" | null;

export interface RecipesState {
  items: RecipeProps[];
}
