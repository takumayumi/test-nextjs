import { InputProps, TextareaProps } from "@chakra-ui/react";
import { z } from "zod";
import { RecipeProps } from "@/types";

export const schema = z.object({
  id: z.string().nullable(),
  imagePath: z
    .any()
    .refine((file) => typeof file === "string" || file instanceof File, {
      message: "Image is required",
    }),
  name: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(1, "Name is required")
  ),
  email: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.email("Invalid email address")
  ),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long")
    .regex(
      /^[a-zA-Z0-9\s\-]+$/,
      "Only letters, numbers, spaces, and dashes are allowed"
    ),
  description: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : undefined),
    z.string().optional()
  ),
  ingredients: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(1, "Ingredients are required")
  ),
  instructions: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(1, "Instructions are required")
  ),
});

export type RecipeFormData = z.infer<typeof schema>;

export interface RecipeFormProps {
  initialValues?: RecipeProps;
  onDelete?: () => void;
}

export type ImageUploadProps = {
  error?: string;
  initialImage?: string;
  onChange: (files: File | null) => void;
};

export interface FormFieldProps
  extends Omit<InputProps & TextareaProps, "error"> {
  label: string;
  name: string;
  type?: "input" | "textarea";
}

export interface DeleteButtonProps {
  onConfirm: () => void;
  title: string;
}
