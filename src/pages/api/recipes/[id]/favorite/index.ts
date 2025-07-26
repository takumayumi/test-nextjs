import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { RecipeProps } from "@/types";

const dataPath = path.join(process.cwd(), "src/data/recipes.json");

const getAllRecipes = (): RecipeProps[] => {
  if (!fs.existsSync(dataPath)) {
    // Ensure the directory exists too
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, "[]", "utf8");
  }

  const file = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(file);
};

const saveAllRecipes = (recipes: RecipeProps[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2), "utf8");
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;
  const { isFavorite } = req.body;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid recipe ID" });
  }

  if (typeof isFavorite !== "boolean") {
    return res.status(400).json({ message: "`isFavorite` must be a boolean" });
  }

  try {
    const recipes = getAllRecipes();
    const index = recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipes[index].isFavorite = isFavorite;
    saveAllRecipes(recipes);

    return res.status(200).json({ success: true, recipe: recipes[index] });
  } catch (error) {
    console.error("Favorite API error:", error);
    return res
      .status(500)
      .json({ message: "Failed to update favorite", error });
  }
}
