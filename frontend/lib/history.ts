import type { CaptionResult, HistoryItem } from "@/types/caption";

const HISTORY_KEY = "ai-caption-history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(result: CaptionResult): HistoryItem {
  const history = getHistory();
  
  const historyItem: HistoryItem = {
    ...result,
    id: crypto.randomUUID(),
    analyzedAt: new Date().toISOString(),
  };
  
  const updatedHistory = [historyItem, ...history];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  
  return historyItem;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function getLatestResult(): HistoryItem | null {
  const history = getHistory();
  return history.length > 0 ? history[0] : null;
}
