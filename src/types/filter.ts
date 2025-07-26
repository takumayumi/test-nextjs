export interface FilterOptions {
  searchTerm?: string;
  isFavorite?: boolean | null;
  sortByTitle?: TitleSortOrder | null;
  sortByDate?: DateSortOrder | null;
}

export type DateSortOrder = "date-asc" | "date-desc";
export type TitleSortOrder = "title-asc" | "title-desc";
