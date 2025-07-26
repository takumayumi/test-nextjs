import { ZodError } from "zod";
import { toaster } from "@/components";
import { sanitizeForm } from "@/lib";
import { RecipeFormData, schema } from "@/types";

export const checkDuplicateTitle = async (title: string): Promise<boolean> => {
  try {
    const res = await fetch("/api/recipes");
    if (!res.ok) throw new Error("Failed to fetch recipes");

    const data = await res.json();
    const isDuplicate = data.recipes.some(
      (r: RecipeFormData) => r.title === title
    );

    if (isDuplicate) {
      toaster.create({
        type: "error",
        title: "Duplicate title",
        description: "A recipe with that title already exists.",
        closable: true,
      });
      return true;
    }
  } catch (err) {
    console.error("Error checking duplicate title:", err);
  }

  return false;
};

export const deleteRecipe = async (id: string) => {
  const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const errorData = await res.json();
    toaster.create({
      type: "error",
      title: "Form error",
      description: errorData.error ?? "Failed to delete recipe.",
    });
    return;
  }

  toaster.create({
    type: "success",
    title: "Recipe deleted",
    description: "Your recipe has been removed successfully!",
  });

  window.location.href = "/";
};

export const submitRecipeForm = async (data: RecipeFormData, toaster: any) => {
  try {
    // Upload image
    if (!data.id) {
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
      data.imagePath = uploaded.path.split("/").pop() || "";
    }

    // Submit form
    const recipeForm = sanitizeForm(data);

    const endpoint = data.id ? `/api/recipes/${data.id}` : "/api/recipes";
    const method = data.id ? "PUT" : "POST";

    const recipeRes = await fetch(endpoint, {
      method,
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
