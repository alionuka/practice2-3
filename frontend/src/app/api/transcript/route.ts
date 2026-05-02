import { NextRequest } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { cookies } from "next/headers";
export const runtime = "nodejs";
export const maxDuration = 150;
export const dynamic = "force-dynamic";

import { services } from "@/data/services";


type TranscriptResponse = {
  data: {
    title?: string;
    videoId?: string;
    thumbnailUrl?: string;
    summary: string;
  } | null;
  error: string | null;
};

function isValidYouTubeVideoId(videoId: unknown): videoId is string {
  return typeof videoId === "string" && /^[a-zA-Z0-9_-]{11}$/.test(videoId);
}

function cleanTranscript(transcript: string) {
  return transcript.replace(/\s+/g, " ").trim().slice(0, 15000);
}

function jsonResponse(
  payload: TranscriptResponse,
  status: number = 200
) {
  return Response.json(payload, { status });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const videoId = body?.videoId;

  if (!isValidYouTubeVideoId(videoId)) {
    return jsonResponse(
      {
        data: null,
        error: "Invalid YouTube video ID.",
      },
      400
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return jsonResponse(
      {
        data: null,
        error: "OPENAI_API_KEY is missing in .env.local.",
      },
      500
    );
  }

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return jsonResponse(
      {
        data: null,
        error: "Unauthorized. Please sign in again.",
      },
      401
    );
  }

  const user = await services.user.getUserMe(jwt);

  if (!user?.id) {
    return jsonResponse(
      {
        data: null,
        error: "Could not load user profile. Please sign in again.",
      },
      401
    );
  }

  try {
    const transcriptData = await services.summarize.generateTranscript(videoId);

    if (!transcriptData.fullTranscript) {
      return jsonResponse(
        {
          data: null,
          error:
            "Transcript is not available for this video. Please try another YouTube video with captions.",
        },
        400
      );
    }

    const transcript = cleanTranscript(transcriptData.fullTranscript);

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `
You are an assistant that summarizes YouTube video transcripts.

Create a useful summary based ONLY on the transcript below.

Rules:
- Do not invent details that are not in the transcript.
- Do not mention that you are an AI.
- Use the same language as the transcript.
- Write 5-7 clear sentences.
- After the summary, add 3 key points as a short bullet list.

Video title:
${transcriptData.title ?? "Untitled video"}

Transcript:
${transcript}
      `,
    });

    const saveResponse = await services.summarize.saveSummaryService(
      {
        videoId,
        title: transcriptData.title || "Untitled video",
        content: text,
        userId: String(user.id),
      },
      jwt
    );

    if ("error" in saveResponse) {
      return jsonResponse(
        {
          data: null,
          error:
            saveResponse.error?.message ||
            "Summary was generated but could not be saved.",
        },
        500
      );
    }

    return jsonResponse({
      data: {
        title: transcriptData.title,
        videoId: transcriptData.videoId,
        thumbnailUrl: transcriptData.thumbnailUrl,
        summary: text,
      },
      error: null,
    });
    } catch (error) {
    console.error("Summary generation error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate summary.";

    const normalizedMessage = message.toLowerCase();

    const isTranscriptError =
      normalizedMessage.includes("transcript") ||
      normalizedMessage.includes("failed_precondition") ||
      normalizedMessage.includes("precondition") ||
      normalizedMessage.includes("get_transcript") ||
      normalizedMessage.includes("no captions") ||
      normalizedMessage.includes("no transcript");

    if (isTranscriptError) {
      return jsonResponse(
        {
          data: null,
          error:
            "Transcript is not available for this video. Please try another YouTube video with captions/subtitles.",
        },
        400
      );
    }

    return jsonResponse(
      {
        data: null,
        error: message,
      },
      500
    );
  }
}