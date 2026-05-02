import type { TranscriptData, TranscriptSegment } from "./types";

type TranscriptSnippet = {
  text: string;
  start: number;
  duration: number;
};

type FetchedTranscript = {
  snippets?: TranscriptSnippet[];
  toRawData?: () => TranscriptSnippet[];
};

type YouTubeOEmbedResponse = {
  title?: string;
  thumbnail_url?: string;
};

const YOUTUBE_VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

function validateIdentifier(identifier: string): void {
  if (!identifier || typeof identifier !== "string") {
    throw new Error("Invalid YouTube video identifier");
  }

  if (!YOUTUBE_VIDEO_ID_REGEX.test(identifier)) {
    throw new Error("Invalid YouTube video ID");
  }
}

function cleanText(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function getVideoMetadata(videoId: string) {
  const fallback = {
    title: "YouTube Video",
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  };

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as YouTubeOEmbedResponse;

    return {
      title: data.title || fallback.title,
      thumbnailUrl: data.thumbnail_url || fallback.thumbnailUrl,
    };
  } catch {
    return fallback;
  }
}

function normalizeTranscriptSegments(
  snippets: TranscriptSnippet[]
): TranscriptSegment[] {
  return snippets
    .filter((snippet) => snippet.text && snippet.text.trim().length > 0)
    .map((snippet) => {
      const start = Number(snippet.start);
      const duration = Number(snippet.duration);
      const end = start + duration;

      return {
        text: cleanText(snippet.text),
        start,
        end,
        duration,
      };
    });
}

async function fetchTranscript(videoId: string): Promise<TranscriptSegment[]> {
  const { YouTubeTranscriptApi } = await import("youtube-transcript-api-js");

  const api = new YouTubeTranscriptApi();

  const transcript = (await api.fetch(videoId, [
    "en",
    "uk",
    "ru",
  ])) as FetchedTranscript;

  const snippets = transcript.snippets ?? transcript.toRawData?.() ?? [];

  const segments = normalizeTranscriptSegments(snippets);

  if (!segments.length) {
    throw new Error("No transcript available for this video");
  }

  return segments;
}

export const generateTranscript = async (
  identifier: string
): Promise<TranscriptData> => {
  try {
    validateIdentifier(identifier);

    const videoId = identifier;
    const metadata = await getVideoMetadata(videoId);
    const transcriptWithTimeCodes = await fetchTranscript(videoId);

    const fullTranscript = transcriptWithTimeCodes
      .map((segment) => segment.text)
      .join(" ");

    if (!fullTranscript) {
      throw new Error("No transcript available for this video");
    }

    return {
      title: metadata.title,
      videoId,
      thumbnailUrl: metadata.thumbnailUrl,
      fullTranscript,
      transcriptWithTimeCodes,
    };
  } catch (error) {
    console.error("Error fetching transcript:", error);

    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch transcript"
    );
  }
};