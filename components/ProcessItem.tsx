"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProcessItemDef } from "@/data/process";

type ProcessItemProps = {
  item: ProcessItemDef;
  checked: boolean;
  note: string;
  hydrated: boolean;
  onToggle: (value: boolean) => void;
  onNoteChange: (text: string) => void;
};

function autoResize(textarea: HTMLTextAreaElement) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export default function ProcessItem({
  item,
  checked,
  note,
  hydrated,
  onToggle,
  onNoteChange,
}: ProcessItemProps) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openEditor = useCallback(() => {
    setEditing(true);
  }, []);

  useEffect(() => {
    if (editing && textareaRef.current) {
      autoResize(textareaRef.current);
      textareaRef.current.focus();
    }
  }, [editing]);

  const hasNote = note.trim().length > 0;

  return (
    <div className={`process-item${checked ? " process-item--done" : ""}`}>
      <label className="process-item-row">
        <span className="process-checkbox-wrap">
          <input
            type="checkbox"
            className="process-checkbox-input"
            checked={hydrated ? checked : false}
            disabled={!hydrated}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <span className="process-checkbox-box" aria-hidden="true">
            {hydrated && checked && (
              <svg viewBox="0 0 12 12" width="12" height="12">
                <path
                  d="M2 6l3 3 5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>
        <span className="process-item-title">{item.title}</span>
      </label>

      <p className="process-item-why">
        {item.why}
        {item.lessonHref && item.lessonLabel && (
          <>
            {" "}
            <Link href={item.lessonHref} className="process-item-link">
              {item.lessonLabel}
            </Link>
          </>
        )}
      </p>

      {editing ? (
        <textarea
          ref={textareaRef}
          className="process-note-input"
          value={note}
          rows={2}
          placeholder="Ваши наблюдения по участку…"
          onChange={(e) => {
            onNoteChange(e.target.value);
            autoResize(e.target);
          }}
          onBlur={() => {
            if (!note.trim()) setEditing(false);
          }}
        />
      ) : hasNote ? (
        <button
          type="button"
          className="process-note-display"
          onClick={openEditor}
        >
          {note}
        </button>
      ) : (
        <button
          type="button"
          className="process-note-add"
          onClick={openEditor}
          disabled={!hydrated}
        >
          + заметка
        </button>
      )}
    </div>
  );
}
