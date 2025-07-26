import formidable from "formidable";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { RecipeProps } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const dataPath = path.join(process.cwd(), "src/data/recipes.json");

const getAllRecipes = (): RecipeProps[] => {
  const file = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(file) as RecipeProps[];
};

const saveAllRecipes = (recipes: RecipeProps[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2), "utf8");
};

// Utility: Promise wrapper for formidable
const parseForm = (req: NextApiRequest) => {
  const form = formidable({ multiples: false });
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    }
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query } = req;
    const id = query.id as string;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required." });
    }

    const recipes = getAllRecipes();
    const index = recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found." });
    }

    if (method === "GET") {
      return res.status(200).json({ success: true, recipe: recipes[index] });
    }

    if (method === "PUT") {
      try {
        const { fields } = await parseForm(req);

        const { title, name, email, description, ingredients, instructions } =
          fields;

        const updated = {
          ...recipes[index],
          title: title?.[0] || "",
          name: name?.[0] || "",
          email: email?.[0] || "",
          description: description?.[0] || "",
          ingredients: ingredients?.[0] || "",
          instructions: instructions?.[0] || "",
          lastUpdated: new Date().toISOString(),
        };

        recipes[index] = updated;
        saveAllRecipes(recipes);

        return res.status(200).json({ success: true, recipe: updated });
      } catch (err) {
        console.error("PUT parse error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to parse form." });
      }
    }

    if (method === "DELETE") {
      const recipeToDelete = recipes[index];
      const imageFilename = recipeToDelete.imagePath?.split("/").pop();
      const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        imageFilename ?? ""
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      const updatedRecipes = recipes.filter((r) => r.id !== id);
      saveAllRecipes(updatedRecipes);

      return res.status(200).json({ success: true });
    }

    return res
      .status(405)
      .json({ success: false, message: "Method not allowed." });
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
