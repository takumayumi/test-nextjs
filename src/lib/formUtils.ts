import { NextApiResponse } from "next";

export const getMissingFields = (
  fields: Record<string, any>,
  res: NextApiResponse
) => {
  const missingFields = Object.entries(fields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing: ${missingFields.join(", ")}`,
    });
  }
};

export const sanitizeForm = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      const isFile = value instanceof File;
      formData.append(key, isFile ? value : String(value));
    }
  });
  return formData;
};
