"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageOff, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getHistory } from "@/lib/history";
import type { HistoryItem } from "@/types/caption";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HistoryCard({ item }: { item: HistoryItem }) {
  const confidencePercentage = Math.round(item.confidence * 100);

  return (
    <Card className="group overflow-hidden transition-all hover:border-purple-500/50 hover:bg-purple-500/5">
      <CardContent className="p-0">
        {/* Image Thumbnail */}
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={item.imageUrl}
            alt={item.fileName}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">
          {/* Caption */}
          <p className="line-clamp-2 text-sm text-foreground">{item.caption}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDate(item.analyzedAt)}
            </span>
            <span className="font-medium text-purple-400">
              {confidencePercentage}% confidence
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="flex size-20 items-center justify-center rounded-full bg-muted">
        <ImageOff className="size-10 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">
          No images analyzed yet
        </h2>
        <p className="mt-2 text-muted-foreground">
          Upload your first image to get started
        </p>
      </div>
      <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  );
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHistory(getHistory());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              History
            </h1>
            <p className="mt-1 text-muted-foreground">
              Your previously analyzed images
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-500/10"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Content */}
        {history.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
