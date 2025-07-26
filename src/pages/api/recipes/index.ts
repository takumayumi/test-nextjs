import formidable, { File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { RecipeProps, schema } from "@/types";
import { ZodError } from "zod";

export const config = {
  api: {
    bodyParser: false,
  },
};

const dataPath = path.join(process.cwd(), "src/data/recipes.json");

const getAllRecipes = (): RecipeProps[] => {
  const file = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(file);
};

const saveAllRecipes = (recipes: RecipeProps[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2), "utf8");
};

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const generateUniqueId = (): string => {
  const existingIds = new Set(getAllRecipes().map((r) => r.id));
  let newId = generateId();
  while (existingIds.has(newId)) {
    newId = generateId();
  }
  return newId;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Form error" });
      }

      const imagePath = fields.imagePath?.[0] || "";
      const name = fields.name?.[0] || "";
      const email = fields.email?.[0] || "";
      const title = fields.title?.[0] || "";
      const description = fields.description?.[0] || "";
      const ingredients = fields.ingredients?.[0] || "";
      const instructions = fields.instructions?.[0] || "";

      const missingFields = [];
      if (!imagePath) missingFields.push("imagePath");
      if (!name) missingFields.push("name");
      if (!email) missingFields.push("email");
      if (!title) missingFields.push("title");
      if (!ingredients) missingFields.push("ingredients");
      if (!instructions) missingFields.push("instructions");

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing: ${missingFields.join(", ")}`,
        });
      }

      const newRecipe: RecipeProps = {
        id: generateUniqueId(),
        name,
        email,
        title,
        description,
        ingredients,
        instructions,
        imagePath,
        dateCreated: new Date().toISOString(),
        isFavorite: false,
      };

      const allRecipes = getAllRecipes();
      allRecipes.push(newRecipe);
      saveAllRecipes(allRecipes);

      return res.status(201).json({ success: true, recipe: newRecipe });
    });
  } else if (req.method === "GET") {
    const allRecipes = getAllRecipes();
    return res.status(200).json({ success: true, recipes: allRecipes });
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
