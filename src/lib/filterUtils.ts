import { FilterOptions, RecipeProps } from "@/types";

export function filterRecipes(
  recipes: RecipeProps[],
  { searchTerm, isFavorite }: FilterOptions
): RecipeProps[] {
  return recipes.filter((recipe) => {
    const matchesTitle =
      !searchTerm ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFavorite =
      isFavorite === null || isFavorite === undefined
        ? true
        : recipe.isFavorite === isFavorite;

    return matchesTitle && matchesFavorite;
  });
}
