import { FilterOptions, RecipeProps } from "@/types";

export function filterRecipes(
  recipes: RecipeProps[],
  { searchTerm, isFavorite, sortByTitle, sortByDate }: FilterOptions
): RecipeProps[] {
  let filtered = recipes.filter((recipe) => {
    const matchesTitle =
      !searchTerm ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFavorite =
      isFavorite === null || isFavorite === undefined
        ? true
        : recipe.isFavorite === isFavorite;

    return matchesTitle && matchesFavorite;
  });

  if (sortByTitle) {
    filtered = filtered.sort((a, b) =>
      sortByTitle === "title-asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }

  if (sortByDate) {
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.dateCreated).getTime();
      const dateB = new Date(b.dateCreated).getTime();
      return sortByDate === "date-asc" ? dateA - dateB : dateB - dateA;
    });
  }

  return filtered;
}
