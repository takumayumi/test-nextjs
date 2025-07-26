import { promises as fs } from "fs";
import path from "path";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { sanitizeTitle } from "@/lib";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({ keepExtensions: true, multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed" });

    try {
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
      const newFilePath = path.join(
        process.cwd(),
        "public/images",
        newFilename
      );

      await fs.rename(imageFile.filepath, newFilePath);

      return res.status(200).json({ path: `/images/${newFilename}` });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error });
      }

      return res.status(500).json({ error: "Unexpected error" });
    }
  });
}
