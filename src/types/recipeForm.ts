import { z } from "zod";

export const schema = z.object({
  image: z.any().refine((file) => file?.length > 0, "Image is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  instructions: z.string().min(1, "Instructions are required"),
});

export type RecipeFormData = z.infer<typeof schema>;
