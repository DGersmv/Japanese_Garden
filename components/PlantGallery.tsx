import { getPlantPhotos } from "@/lib/plant-photos";

type PlantGalleryProps = {
  slug: string;
  name: string;
};

export default function PlantGallery({ slug, name }: PlantGalleryProps) {
  const photos = getPlantPhotos(slug);

  if (photos.length === 0) {
    return (
      <div className="plant-gallery">
        <div className="plant-gallery-placeholder">
          <span className="ph-tag">
            Добавьте фото в public/photos/plants/{slug}/
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-gallery">
      <div className="plant-gallery-grid">
        {photos.map((file) => (
          <div key={file} className="plant-gallery-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/photos/plants/${slug}/${encodeURIComponent(file)}`}
              alt={`${name} — ${file}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
