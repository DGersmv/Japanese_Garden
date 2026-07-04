import { getLessonPhotos } from "@/lib/lesson-photos";
import LessonGalleryClient from "@/components/LessonGalleryClient";

type LessonGalleryProps = {
  lessonId: string;
  kanji: string;
  tag: string;
  caption: React.ReactNode;
  keywords?: string;
  alt?: string;
};

export default function LessonGallery({
  lessonId,
  kanji,
  tag,
  caption,
  keywords,
  alt,
}: LessonGalleryProps) {
  const photos = getLessonPhotos(lessonId);
  const altText =
    alt ?? (typeof caption === "string" ? caption : tag);

  return (
    <LessonGalleryClient
      lessonId={lessonId}
      photos={photos}
      kanji={kanji}
      tag={tag}
      caption={caption}
      keywords={keywords}
      alt={altText}
    />
  );
}
