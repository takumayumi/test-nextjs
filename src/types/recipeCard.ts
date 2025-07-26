import { RecipeProps } from "@/types";

export type RecipeCardProps = {
  isFirst?: boolean;
  isLast?: boolean;
  onToggleFavorite?: (id: string) => void;
  recipe: RecipeProps;
};
