export interface CaptionResult {
  fileName: string;
  imageUrl: string;
  caption: string;
  tags: string[];
  confidence: number;
}

export interface HistoryItem extends CaptionResult {
  id: string;
  analyzedAt: string;
}
