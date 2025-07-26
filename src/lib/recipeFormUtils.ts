import { RecipeFormData, schema } from "@/types";
import { ZodError } from "zod";

export const checkDuplicateTitle = async (title: string): Promise<boolean> => {
  try {
    const res = await fetch("/api/recipes");
    if (!res.ok) throw new Error("Failed to fetch recipes");

    const data = await res.json();
    return data.recipes.some((r: RecipeFormData) => r.title === title);
  } catch (err) {
    console.error("Error checking duplicate title:", err);
    return false;
  }
};

export const submitRecipeForm = async (data: RecipeFormData, toaster: any) => {
  try {
    // Upload image
    const uploadForm = new FormData();
    uploadForm.append("imagePath", data.imagePath);
    uploadForm.append("title", data.title);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      const errorData = await uploadRes.json();
      throw new Error(errorData.error || "Image upload failed.");
    }

    const uploaded = await uploadRes.json();
    const uploadedFilename = uploaded.path.split("/").pop() || "";

    // Submit form
    const recipeForm = new FormData();
    recipeForm.append("imagePath", uploadedFilename || "");
    recipeForm.append("name", data.name || "");
    recipeForm.append("email", data.email || "");
    recipeForm.append("title", data.title || "");
    recipeForm.append("description", data.description || "");
    recipeForm.append("ingredients", data.ingredients || "");
    recipeForm.append("instructions", data.instructions || "");
    console.log("recipeform");
    for (const [key, value] of recipeForm.entries()) {
      console.log(`${key}:`, value);
    }

    const recipeRes = await fetch("/api/recipes", {
      method: "POST",
      body: recipeForm,
    });

    if (!recipeRes.ok) {
      const errorData = await recipeRes.json();
      toaster.create({
        type: "error",
        title: "Form error",
        description: errorData.error ?? "Failed to submit recipe.",
      });
      return;
    }

    toaster.create({
      type: "success",
      title: "Recipe saved",
      description: "Your recipe has been added successfully!",
    });
  } catch (err) {
    toaster.create({
      type: "error",
      title: "Form error",
      description: (err as Error).message,
    });
  }
};

export const validate = (values: RecipeFormData) => {
  try {
    schema.parse(values);
    return {};
  } catch (err) {
    if (err instanceof ZodError) {
      return err.flatten().fieldErrors;
    }
    return {};
  }
};
