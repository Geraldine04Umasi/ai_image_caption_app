"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UploadZone } from "@/components/upload/upload-zone";
import { uploadImage } from "@/services/api";
import { addToHistory } from "@/lib/history";

export default function HomePage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadImage(selectedFile);
      addToHistory(result);
      router.push("/result");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-600/20">
              <Sparkles className="size-6 text-purple-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Image Caption Generator
          </h1>
          <p className="mt-3 text-muted-foreground">
            Upload an image and let AI generate captions, tags, and analysis
          </p>
        </div>

        {/* Upload Zone */}
        <UploadZone
          onFileSelect={(file) => {
            setSelectedFile(file);
            setError(null);
          }}
          selectedFile={selectedFile}
          onClear={() => {
            setSelectedFile(null);
            setError(null);
          }}
        />

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Analyze Button */}
        {selectedFile && (
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white rounded-full py-6 text-lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner className="size-5" />
                  Analyzing image...
                </span>
              ) : (
                "Analyze Image"
              )}
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground animate-pulse">
              This may take a few seconds...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
