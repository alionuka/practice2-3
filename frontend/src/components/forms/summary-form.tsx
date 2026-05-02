"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { extractYouTubeID } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/submit-button";

type SummaryResult = {
  title?: string;
  videoId?: string;
  thumbnailUrl?: string;
  summary?: string;
};

type SummaryApiResponse = {
  data: SummaryResult | null;
  error: string | null;
};

export function SummaryForm() {
  const [result, setResult] = useState<SummaryResult | null>(null);

  async function handleSubmit(formData: FormData) {
    const url = formData.get("url") as string;
    const videoId = extractYouTubeID(url);

    setResult(null);

    if (!videoId) {
      toast.error("Invalid YouTube URL or video ID.");
      return;
    }

    const response = await fetch("/api/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId }),
    });

    const payload = (await response.json()) as SummaryApiResponse;

    if (!response.ok || payload.error || !payload.data) {
      toast.error(payload.error || "Something went wrong.");
      return;
    }

    setResult(payload.data);
    toast.success("Summary generated and saved successfully.");
  }

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <div>
        <h2 className="text-2xl font-bold">Create Video Summary</h2>
        <p className="text-muted-foreground">
          Paste a YouTube URL or video ID. The video must have an available
          transcript/captions.
        </p>
      </div>

      <form action={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          name="url"
          placeholder="YouTube URL or video ID"
          required
          className="flex-1"
        />

        <SubmitButton
          text="Create Summary"
          loadingText="Creating..."
        />
      </form>

      {result && (
        <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
          {result.thumbnailUrl && (
            <img
              src={result.thumbnailUrl}
              alt={result.title || "Video thumbnail"}
              className="w-full rounded-lg border object-cover"
            />
          )}

          <div>
            <h3 className="text-xl font-semibold">
              {result.title || "Generated Summary"}
            </h3>

            {result.videoId && (
              <p className="text-sm text-muted-foreground">
                Video ID: {result.videoId}
              </p>
            )}
          </div>

          <p className="whitespace-pre-line leading-7">
            {result.summary}
          </p>
        </div>
      )}
    </div>
  );
}