import { promises as fs } from "fs";
import path from "path";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { sanitizeTitle } from "@/lib";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to turn formidable's parse into a promise
const parseForm = (req: NextApiRequest) => {
  const form = formidable({ keepExtensions: true, multiples: false });
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
    const { fields, files } = await parseForm(req);

    const title = fields.title?.[0];
    if (!title) {
      return res.status(400).json({ error: "No title provided" });
    }

    const imageFile = files.imagePath?.[0] as formidable.File;
    if (!imageFile) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const sanitized = sanitizeTitle(title);
    const ext = path.extname(imageFile.originalFilename || ".jpg");
    const newFilename = `${sanitized}${ext}`;
    const newFilePath = path.join(process.cwd(), "public/images", newFilename);

    await fs.rename(imageFile.filepath, newFilePath);

    return res.status(200).json({ path: `/images/${newFilename}` });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.message });
    }

    console.error("Upload error:", error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
