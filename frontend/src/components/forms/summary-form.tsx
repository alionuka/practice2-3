"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { api } from "@/data/api";
import { extractYouTubeID } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/submit-button";

type SummaryResult = {
  title?: string;
  videoId?: string;
  summary?: string;
  fallback?: boolean;
};

export function SummaryForm() {
  const [result, setResult] = useState<SummaryResult | null>(null);

  async function handleSubmit(formData: FormData) {
    const url = formData.get("url") as string;
    const videoId = extractYouTubeID(url);

    setResult(null);

    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    const response = await api.post<{
      data: SummaryResult | null;
      error: string | null;
    }>("/api/transcript", { videoId });
    console.log("API RESPONSE:", response);

    if (response.error || !response.data) {
      toast.error(response.error || "Something went wrong");
      return;
    }

    setResult(response.data);
    toast.success("Summary generated successfully");
  }

  return (
    <div className="space-y-6">
      <form action={handleSubmit} className="flex gap-2">
        <Input name="url" placeholder="Paste YouTube URL" className="max-w-md" />
        <SubmitButton text="Generate" loadingText="Generating..." />
      </form>

      {result && (
        <div className="rounded-md border p-4">
          <h2 className="text-xl font-bold">
            {result.title || "Generated Summary"}
          </h2>

          {result.fallback && (
            <p className="mt-2 text-sm text-yellow-600">
              Transcript was not available, so fallback summary was generated.
            </p>
          )}

          <p className="mt-4 whitespace-pre-wrap text-sm">
            {result.summary}
          </p>
        </div>
      )}
    </div>
  );
}