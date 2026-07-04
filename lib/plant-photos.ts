import fs from "fs";
import path from "path";

const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function getPlantsPhotosDir(): string {
  return path.join(process.cwd(), "public", "photos", "plants");
}

export function getPlantPhotos(slug: string): string[] {
  const dir = path.join(getPlantsPhotosDir(), slug);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => PHOTO_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "ru"));
}
