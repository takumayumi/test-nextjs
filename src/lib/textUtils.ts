export const sanitizeField = (value: any): string => {
  return typeof value === "string"
    ? value.trim()
    : Array.isArray(value)
    ? (value[0] || "").toString().trim()
    : "";
};

export const sanitizeTitle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
};
