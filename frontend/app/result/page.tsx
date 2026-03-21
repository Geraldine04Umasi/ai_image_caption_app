"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Copy, Check, ArrowLeft, History, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getLatestResult } from "@/lib/history";
import type { HistoryItem } from "@/types/caption";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<HistoryItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const latestResult = getLatestResult();
    if (!latestResult) {
      router.push("/");
      return;
    }
    setResult(latestResult);
  }, [router]);

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </main>
    );
  }

  const confidencePercentage = Math.round(result.confidence * 100);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Analysis Result
          </h1>
        </div>

        {/* Image Preview */}
        <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
          <div className="flex items-center justify-center p-4">
            <img
              src={result.imageUrl}
              alt={result.fileName}
              className="max-h-72 rounded-lg object-contain"
            />
          </div>
        </div>

        {/* Caption Card */}
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Quote className="size-5 text-purple-400" />
              Generated Caption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-foreground">
              {result.caption}
            </blockquote>
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Confidence */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Confidence
            </h3>
            <span className="text-sm font-semibold text-purple-400">
              {confidencePercentage}%
            </span>
          </div>
          <Progress 
            value={confidencePercentage} 
            className="h-2 bg-purple-500/20 [&>div]:bg-purple-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1 border-purple-500/30 hover:bg-purple-500/10"
          >
            {copied ? (
              <span className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Copy className="size-4" />
                Copy Caption
              </span>
            )}
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ArrowLeft className="size-4" />
            Analyze Another Image
          </Button>
        </div>

        {/* History Link */}
        <div className="pt-4 text-center">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-purple-400"
          >
            <History className="size-4" />
            View History
          </Link>
        </div>
      </div>
    </main>
  );
}
