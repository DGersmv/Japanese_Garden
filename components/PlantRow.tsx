import type { Plant } from "@/data/plants";

type PlantRowProps = {
  plant: Plant;
};

export default function PlantRow({ plant }: PlantRowProps) {
  return (
    <div className="prow">
      <div className="pname">
        <b>{plant.name}</b>
        <i>{plant.latin}</i>
      </div>
      <div className="proles">
        {plant.tags.map((tag) => (
          <span key={tag} className="ptag">
            {tag}
          </span>
        ))}
        {plant.tagLabel && <span className="txt">{plant.tagLabel}</span>}
      </div>
      <div className="pnote">{plant.note}</div>
    </div>
  );
}
