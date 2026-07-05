import ModuleHeader from "@/components/ModuleHeader";
import ProcessTracker from "@/components/ProcessTracker";

export default function ProcessPage() {
  return (
    <main className="page">
      <section className="module">
        <div className="inner">
          <ModuleHeader
            kanji="順"
            label="Раздел · инструмент"
            title="От топосъёмки до проекта"
            intro="Интерактивный чек-лист из восьми стадий — от обследования участка до сдачи проекта. Отмечайте выполненное, пишите заметки по своему участку: галочки и текст сохраняются в браузере на этом устройстве."
          />

          <ProcessTracker />
        </div>
      </section>
    </main>
  );
}
