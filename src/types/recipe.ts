export interface RecipeProps {
  id: string;
  imagePath: string;
  name: string;
  email: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  dateCreated: string;
  lastUpdated: string;
  isFavorite: boolean;
}

export interface RecipePageProps {
  recipe: RecipeProps | null;
}
