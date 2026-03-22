"use client";

import { useCallback, useState } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function UploadZone({
  onFileSelect,
  selectedFile,
  onClear,
}: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        alert("Please upload a valid image file (JPG, PNG, or WebP)");
        return;
      }

      if (file.size > MAX_SIZE_BYTES) {
        alert(`Image must be smaller than ${MAX_SIZE_MB}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleClear = useCallback(() => {
    setPreview(null);
    onClear();
  }, [onClear]);

  return (
    <div className="w-full space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-all duration-300",
          isDragOver
            ? "border-purple-500 bg-purple-500/10"
            : "border-muted-foreground/30 hover:border-purple-500/50 hover:bg-purple-500/5",
          selectedFile && "border-purple-500 bg-purple-500/5",
        )}
      >
        <div
          className={cn(
            "flex size-16 items-center justify-center rounded-full transition-colors duration-300",
            isDragOver ? "bg-purple-500/20" : "bg-muted",
          )}
        >
          {selectedFile ? (
            <ImageIcon className="size-8 text-purple-400" />
          ) : (
            <Upload
              className={cn(
                "size-8 transition-colors duration-300",
                isDragOver ? "text-purple-400" : "text-muted-foreground",
              )}
            />
          )}
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-foreground">
            {selectedFile ? selectedFile.name : "Drag & drop your image here"}
          </p>
          {!selectedFile && (
            <p className="mt-1 text-sm text-muted-foreground">
              Supports JPG, PNG, WebP
            </p>
          )}
        </div>

        {!selectedFile && (
          <>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-border" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="h-px w-12 bg-border" />
            </div>

            <Button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              Upload Image
            </Button>
          </>
        )}

        <input
          id="file-input"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleInputChange}
          className="sr-only"
        />
      </div>

      {preview && (
        <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30">
          <button
            onClick={handleClear}
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-destructive hover:text-white"
          >
            <X className="size-4" />
          </button>
          <div className="flex items-center justify-center p-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
