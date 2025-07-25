import { Recipe } from "@/types";

export type RecipeCardProps = {
  isFirst?: boolean;
  isLast?: boolean;
  onToggleFavorite?: (id: string) => void;
  recipe: Recipe;
};
