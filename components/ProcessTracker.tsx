"use client";

import { useCallback, useMemo } from "react";
import {
  processStages,
  processTotalItems,
} from "@/data/process";
import { useProcessState } from "@/lib/use-process-state";
import ProcessStage from "@/components/ProcessStage";

function buildMarkdown(
  checked: Record<string, boolean>,
  notes: Record<string, string>,
): string {
  const lines: string[] = [
    "# От топосъёмки до проекта",
    "",
  ];

  processStages.forEach((stage, i) => {
    lines.push(`## ${i + 1}. ${stage.kanji} ${stage.title}`);
    lines.push("");
    stage.items.forEach((item) => {
      const mark = checked[item.id] ? "x" : " ";
      lines.push(`- [${mark}] ${item.title}`);
      const note = notes[item.id]?.trim();
      if (note) {
        lines.push(`  > ${note.replace(/\n/g, "\n  > ")}`);
      }
    });
    lines.push("");
    lines.push(`**Ворота:** ${stage.gate}`);
    lines.push("");
  });

  return lines.join("\n");
}

function getCurrentStageIndex(
  checked: Record<string, boolean>,
): number {
  for (let i = 0; i < processStages.length; i++) {
    const stage = processStages[i];
    const allDone = stage.items.every((item) => checked[item.id]);
    if (!allDone) return i;
  }
  return processStages.length - 1;
}

export default function ProcessTracker() {
  const {
    mounted,
    state,
    toggleChecked,
    setNote,
    toggleCollapsed,
    resetProgress,
  } = useProcessState();

  const doneCount = useMemo(
    () => processStages.reduce(
      (sum, stage) =>
        sum + stage.items.filter((item) => state.checked[item.id]).length,
      0,
    ),
    [state.checked],
  );

  const currentStageIndex = useMemo(
    () => getCurrentStageIndex(state.checked),
    [state.checked],
  );

  const progressPct =
    processTotalItems > 0 ? (doneCount / processTotalItems) * 100 : 0;

  const handleReset = useCallback(() => {
    if (!window.confirm("Сбросить все галочки и свёрнутость стадий?")) return;
    const deleteNotes = window.confirm("Удалить и заметки?");
    resetProgress(deleteNotes);
  }, [resetProgress]);

  const handleExport = useCallback(async () => {
    const md = buildMarkdown(state.checked, state.notes);
    try {
      await navigator.clipboard.writeText(md);
      window.alert("Чек-лист скопирован в буфер обмена (Markdown).");
    } catch {
      window.prompt("Скопируйте текст:", md);
    }
  }, [state.checked, state.notes]);

  return (
    <div className="process-tracker">
      <div className="process-overall">
        <div
          className="process-bar"
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={processTotalItems}
          aria-label="Общий прогресс"
        >
          <div
            className="process-bar-fill"
            style={{ width: mounted ? `${progressPct}%` : "0%" }}
          />
        </div>
        <p className="process-overall-text">
          {mounted ? (
            <>
              {doneCount} / {processTotalItems} · стадия{" "}
              {currentStageIndex + 1} из {processStages.length}
            </>
          ) : (
            <>Загрузка прогресса…</>
          )}
        </p>
      </div>

      <div className="process-stages">
        {processStages.map((stage, index) => (
          <ProcessStage
            key={stage.id}
            stage={stage}
            stageIndex={index}
            checked={state.checked}
            notes={state.notes}
            collapsed={!!state.collapsed[stage.id]}
            hydrated={mounted}
            onToggleCollapsed={() => toggleCollapsed(stage.id)}
            onToggleItem={toggleChecked}
            onNoteChange={setNote}
          />
        ))}
      </div>

      <div className="process-actions">
        <button type="button" className="process-btn" onClick={handleExport}>
          Экспорт в текст
        </button>
        <button
          type="button"
          className="process-btn process-btn--muted"
          onClick={handleReset}
        >
          Сбросить прогресс
        </button>
      </div>
    </div>
  );
}
