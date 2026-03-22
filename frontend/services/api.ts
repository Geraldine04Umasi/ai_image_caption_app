import type { CaptionResult } from "@/types/caption";

const API_URL = "https://aiimagecaptionapp-production.up.railway.app";

export async function uploadImage(file: File): Promise<CaptionResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to analyze image. Please try again.");
  }

  return res.json();
}
