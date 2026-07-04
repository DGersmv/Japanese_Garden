"use client";

import { useCallback, useEffect, useState } from "react";

type LessonGalleryClientProps = {
  lessonId: string;
  photos: string[];
  kanji: string;
  tag: string;
  caption: React.ReactNode;
  keywords?: string;
  alt: string;
};

export default function LessonGalleryClient({
  lessonId,
  photos,
  kanji,
  tag,
  caption,
  keywords,
  alt,
}: LessonGalleryClientProps) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      if (photos.length === 0) return;
      setIndex((i) => (i + delta + photos.length) % photos.length);
    },
    [photos.length],
  );

  useEffect(() => {
    setIndex(0);
  }, [lessonId, photos.length]);

  useEffect(() => {
    if (photos.length === 0) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, photos.length]);

  if (photos.length === 0) {
    return (
      <figure className="photo">
        <div className="ph-frame" data-kanji={kanji}>
          <span className="ph-tag">
            {tag}
            <br />
            public/photos/lessons/{lessonId}/
          </span>
        </div>
        <figcaption>
          {caption}
          {keywords && <span className="kw">{keywords}</span>}
        </figcaption>
      </figure>
    );
  }

  const current = photos[index];

  return (
    <figure className="photo">
      <div className="lesson-gallery">
        <div className="ph-frame has-img lesson-gallery-frame" data-kanji={kanji}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current}
            src={`/photos/lessons/${lessonId}/${encodeURIComponent(current)}`}
            alt={`${alt} — ${current}`}
          />
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="lesson-gallery-btn lesson-gallery-prev"
                onClick={() => go(-1)}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className="lesson-gallery-btn lesson-gallery-next"
                onClick={() => go(1)}
                aria-label="Следующее фото"
              >
                ›
              </button>
              <span className="lesson-gallery-counter">
                {index + 1} / {photos.length}
              </span>
            </>
          )}
        </div>
        {photos.length > 1 && (
          <div className="lesson-gallery-thumbs" role="tablist" aria-label="Миниатюры">
            {photos.map((file, i) => (
              <button
                key={file}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Фото ${i + 1}`}
                className={`lesson-gallery-thumb${i === index ? " active" : ""}`}
                onClick={() => setIndex(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/photos/lessons/${lessonId}/${encodeURIComponent(file)}`}
                  alt=""
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <figcaption>
        {caption}
        {keywords && <span className="kw">{keywords}</span>}
      </figcaption>
    </figure>
  );
}
