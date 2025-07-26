import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { getMissingFields, sanitizeField } from "@/lib";
import { RecipeProps } from "@/types";

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

// Helper to wrap formidable in a Promise
const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields }> => {
  const form = formidable({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, _files) => {
      if (err) reject(err);
      else resolve({ fields });
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { fields } = await parseForm(req);

      const imagePath = sanitizeField(fields.imagePath);
      const name = sanitizeField(fields.name);
      const email = sanitizeField(fields.email);
      const title = sanitizeField(fields.title);
      const description = sanitizeField(fields.description);
      const ingredients = sanitizeField(fields.ingredients);
      const instructions = sanitizeField(fields.instructions);

      const requiredFields = {
        imagePath,
        name,
        email,
        title,
        ingredients,
        instructions,
      };

      // If there are missing fields, it already ends the response
      getMissingFields(requiredFields, res);

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
        lastUpdated: new Date().toISOString(),
        isFavorite: false,
      };

      const allRecipes = getAllRecipes();
      allRecipes.push(newRecipe);
      saveAllRecipes(allRecipes);

      return res.status(201).json({ success: true, recipe: newRecipe });
    } catch (error) {
      console.error("Form parse error:", error);
      return res.status(500).json({ success: false, message: "Upload failed" });
    }
  } else if (req.method === "GET") {
    const allRecipes = getAllRecipes();
    return res.status(200).json({ success: true, recipes: allRecipes });
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
