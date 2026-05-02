import type { TranscriptData, TranscriptSegment } from "./types";

type RawTranscriptSegment = {
  text?: string;
  duration?: number;
  offset?: number;
  start?: number;
};

type YouTubeOEmbedResponse = {
  title?: string;
  thumbnail_url?: string;
};

const YOUTUBE_VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

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
        headers: {
          "User-Agent": USER_AGENT,
        },
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
  segments: RawTranscriptSegment[]
): TranscriptSegment[] {
  return segments
    .filter((segment) => segment.text && segment.text.trim().length > 0)
    .map((segment) => {
      const start = Number(segment.offset ?? segment.start ?? 0);
      const duration = Number(segment.duration ?? 0);
      const end = start + duration;

      return {
        text: cleanText(segment.text ?? ""),
        start,
        end,
        duration,
      };
    });
}

async function fetchTranscript(videoId: string): Promise<TranscriptSegment[]> {
  const { fetchTranscript } = await import("youtube-transcript-plus");

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const transcript = (await fetchTranscript(videoUrl, {
    userAgent: USER_AGENT,
  })) as RawTranscriptSegment[];

  const segments = normalizeTranscriptSegments(transcript);

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