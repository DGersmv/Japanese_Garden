"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const STORAGE_KEY = "garden-process-tracker-v1";

export type TrackerState = {
  version: 1;
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  collapsed: Record<string, boolean>;
};

const defaultState: TrackerState = {
  version: 1,
  checked: {},
  notes: {},
  collapsed: {},
};

function loadState(): TrackerState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<TrackerState>;
    if (parsed.version !== 1) return defaultState;
    return {
      version: 1,
      checked: parsed.checked ?? {},
      notes: parsed.notes ?? {},
      collapsed: parsed.collapsed ?? {},
    };
  } catch {
    return defaultState;
  }
}

export function saveStateImmediate(state: TrackerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProcessState() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<TrackerState>(defaultState);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const persist = useCallback((next: TrackerState) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveStateImmediate(next);
    }, 400);
  }, []);

  const updateState = useCallback(
    (updater: (prev: TrackerState) => TrackerState) => {
      setState((prev) => {
        const next = updater(prev);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const toggleChecked = useCallback(
    (itemId: string, value: boolean) => {
      updateState((prev) => ({
        ...prev,
        checked: { ...prev.checked, [itemId]: value },
      }));
    },
    [updateState],
  );

  const setNote = useCallback(
    (itemId: string, text: string) => {
      updateState((prev) => ({
        ...prev,
        notes: { ...prev.notes, [itemId]: text },
      }));
    },
    [updateState],
  );

  const toggleCollapsed = useCallback(
    (stageId: string) => {
      updateState((prev) => ({
        ...prev,
        collapsed: {
          ...prev.collapsed,
          [stageId]: !prev.collapsed[stageId],
        },
      }));
    },
    [updateState],
  );

  const resetProgress = useCallback(
    (includeNotes: boolean) => {
      const next: TrackerState = {
        version: 1,
        checked: {},
        notes: includeNotes ? {} : state.notes,
        collapsed: {},
      };
      setState(next);
      saveStateImmediate(next);
    },
    [state.notes],
  );

  return {
    mounted,
    state,
    toggleChecked,
    setNote,
    toggleCollapsed,
    resetProgress,
  };
}
