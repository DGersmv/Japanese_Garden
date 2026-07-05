"use client";

import type { CSSProperties } from "react";
import type { ProcessStageDef } from "@/data/process";
import { phaseColors } from "@/data/process";
import ProcessItem from "@/components/ProcessItem";

type ProcessStageProps = {
  stage: ProcessStageDef;
  stageIndex: number;
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  collapsed: boolean;
  hydrated: boolean;
  onToggleCollapsed: () => void;
  onToggleItem: (itemId: string, value: boolean) => void;
  onNoteChange: (itemId: string, text: string) => void;
};

export default function ProcessStage({
  stage,
  stageIndex,
  checked,
  notes,
  collapsed,
  hydrated,
  onToggleCollapsed,
  onToggleItem,
  onNoteChange,
}: ProcessStageProps) {
  const doneCount = stage.items.filter((item) => checked[item.id]).length;
  const totalCount = stage.items.length;
  const complete = doneCount === totalCount && totalCount > 0;
  const isOpen = !collapsed;
  const phaseColor = phaseColors[stage.phase];

  return (
    <article
      className={`process-stage${complete ? " process-stage--complete" : ""}`}
      style={{ "--phase-color": phaseColor } as CSSProperties}
    >
      <button
        type="button"
        className="process-stage-head"
        aria-expanded={isOpen}
        onClick={onToggleCollapsed}
      >
        <span
          className="process-stage-kanji kj"
          style={complete ? { color: "var(--shu)" } : undefined}
        >
          {stage.kanji}
        </span>
        <span className="process-stage-title-wrap">
          <span className="process-stage-num">
            Стадия {stageIndex + 1}
            {complete && (
              <span className="process-stage-done-mark" aria-label="завершено">
                {" "}
                · 済
              </span>
            )}
          </span>
          <span className="process-stage-title">{stage.title}</span>
        </span>
        <span className="process-stage-progress">
          {doneCount}/{totalCount}
        </span>
        <span className="process-stage-toggle" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="process-stage-body">
          <p className="process-stage-intro">{stage.intro}</p>

          <div className="process-items">
            {stage.items.map((item) => (
              <ProcessItem
                key={item.id}
                item={item}
                checked={!!checked[item.id]}
                note={notes[item.id] ?? ""}
                hydrated={hydrated}
                onToggle={(value) => onToggleItem(item.id, value)}
                onNoteChange={(text) => onNoteChange(item.id, text)}
              />
            ))}
          </div>

          <div className="note process-gate">
            <b>Ворота:</b> {stage.gate}
          </div>
        </div>
      )}
    </article>
  );
}
