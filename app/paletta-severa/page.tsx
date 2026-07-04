import ModuleHeader from "@/components/ModuleHeader";
import PlantRow from "@/components/PlantRow";
import PlantGallery from "@/components/PlantGallery";
import { plantGroups, plants, legendTags } from "@/data/plants";

export default function PalettaSeveraPage() {
  return (
    <main className="page">
      <section className="module">
        <div className="inner">
          <ModuleHeader
            kanji="植"
            label="Справочник · к модулю 4"
            title="Растительная палитра севера"
            intro="Видовой состав для Карельского перешейка и юга Ленинградской области (зоны 3b–4). Растения сгруппированы не ботанически, а по роли в композиции; для каждого указан сюжет — где и зачем оно работает в саду. Местный климат — союзник: кислые почвы любят мох и рододендроны, а долгая зима делает вечнозелёный каркас и зимнюю графику важнее цветения."
          >
            <div className="legend">
              {legendTags.map(({ tag, label }) => (
                <span key={tag}>
                  <span className="ptag">{tag}</span>
                  {label}
                </span>
              ))}
            </div>
          </ModuleHeader>

          {plantGroups.map((group) => {
            const groupPlants = plants.filter((p) => p.group === group.id);
            return (
              <div key={group.id} className="pgroup">
                <h4>{group.title}</h4>
                <p className="pg-note">{group.note}</p>
                {groupPlants.map((plant) => (
                  <div key={plant.slug} id={plant.slug} className="plant-entry">
                    <PlantRow plant={plant} />
                    <PlantGallery slug={plant.slug} name={plant.name} />
                  </div>
                ))}
              </div>
            );
          })}

          <div className="note" style={{ marginTop: 36 }}>
            <b>Правило палитры:</b> это меню, а не посадочная ведомость. В один
            проект из справочника берётся не больше десяти позиций (столп 4 —
            кансо), из них 2–3 — крупными массами, остальные — единичными
            акцентами. Проверяйте ведомость: если ни один вид не занимает более
            20 % площади посадок — сад пёстрый, укрупняйте пятна.
          </div>
        </div>
      </section>
    </main>
  );
}
