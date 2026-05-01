export interface TranscriptSegment {
  text: string;
  start: number;
  end: number;
  duration: number;
}

export interface TranscriptData {
  title: string | undefined;
  videoId: string | undefined;
  thumbnailUrl: string | undefined;
  fullTranscript: string | undefined;
  transcriptWithTimeCodes?: TranscriptSegment[];
}

export interface YouTubeTranscriptSegment {
  snippet: {
    text: string;
  };
  start_ms: string;
  end_ms: string;
}

export interface YouTubeTranscriptContent {
  transcript: {
    content: {
      body: {
        initial_segments: YouTubeTranscriptSegment[];
      };
    };
  };
}

export interface YouTubeAPIVideoInfo {
  basic_info: {
    title?: string;
    id: string;
    thumbnail?: Array<{
      url: string;
      width?: number;
      height?: number;
    }>;
  };
  getTranscript(): Promise<YouTubeTranscriptContent>;
}