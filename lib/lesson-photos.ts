import fs from "fs";
import path from "path";

const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export const lessonIds = [
  "1-1", "1-2", "1-3",
  "2-1", "2-2", "2-3",
  "3-1", "3-2", "3-3",
  "4-1", "4-2", "4-3",
  "5-1", "5-2", "5-3",
  "6-1", "6-2", "6-3",
  "lp-1", "lp-2", "lp-3", "lp-4", "lp-5", "lp-6",
] as const;

export type LessonId = (typeof lessonIds)[number];

export function getLessonsPhotosDir(): string {
  return path.join(process.cwd(), "public", "photos", "lessons");
}

export function getLessonPhotos(lessonId: string): string[] {
  const dir = path.join(getLessonsPhotosDir(), lessonId);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => PHOTO_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "ru"));
}

export function lessonPhotoUrl(lessonId: string, file: string): string {
  return `/photos/lessons/${lessonId}/${encodeURIComponent(file)}`;
}
