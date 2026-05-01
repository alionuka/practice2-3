import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { content } = await req.json();

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `Summarize the following content clearly and concisely:\n\n${content}`,
  });

  return Response.json({
    summary: text,
  });
}